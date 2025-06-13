import User from "../models/user.model.js";
import { Webhook } from "svix";

export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("Webhook secret key is not available");
    return res.status(500).json({ message: "Webhook secret not available" });
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let event;

  try {
    event = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification failed:", err.message);
    return res.status(400).json({
      message: "Webhook verification failed",
    });
  }

  console.log("Received Clerk event:", event.type);

  if (event.type === "user.created") {
    const { id, username, email_addresses, profile_image_url } = event.data;

    try {
      const newUser = new User({
        clerkUserId: id,
        username: username || email_addresses[0]?.email_address,
        email: email_addresses[0]?.email_address,
        img: profile_image_url,
      });

      await newUser.save();
      console.log("✅ New user saved:", newUser.email);
    } catch (err) {
      console.error("Failed to save user:", err.message);
      return res.status(500).json({ message: "Failed to save user" });
    }
  }

  return res.status(200).json({
    message: "Webhook received and processed",
  });
};
