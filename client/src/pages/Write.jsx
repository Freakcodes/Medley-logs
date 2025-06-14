import { useUser, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IKContext, IKUpload } from "imagekitio-react";

const authenticator = async () => {
  try {
    // Perform the request to the upload authentication endpoint.
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/upload-auth`
    );
    if (!response.ok) {
      // If the server response is not successful, extract the error text for debugging.
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    // Parse and destructure the response JSON for upload credentials.
    const data = await response.json();
    const { signature, expire, token, publicKey } = data;
    return { signature, expire, token, publicKey };
  } catch (error) {
    // Log the original error for debugging before rethrowing a new error.
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const navigate=useNavigate();
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = await getToken();
      const res = axios.post(`${import.meta.env.VITE_API_URL}/posts`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
       
      });
      onSuccess: (data, variables) => {
    const slug = variables.slug; // from postData
    
  },
      console.log(res);
      return res;
    },
  });
  const handleSuccess=(res)=>{
    setCoverImage(res.url);
  }
  if (!isLoaded) {
    return (
      <div className="flex justify-center w-full items-center">Loading...</div>
    );
  }
  if (isLoaded && !isSignedIn) {
    return (
      <div className="flex justify-center h-[calc(100vh-100px)] items-center  text-3xl text-blue-500">
        Please login first..
      </div>
    );
  }

  const onSubmit = (data) => {
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const postData = {
      img: coverImage,
      title: data.title,
      category:data.category,
      slug,
      desc: data.shortDescription,
      content,
    };
    mutation.mutate(postData);
    console.log("Post Submitted:", postData);

    reset(); 
    setContent('');
    setCoverImage(null);
    navigate(`/myposts`)
  };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setCoverImage(imageUrl);
  //   }
  // };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="max-w-4xl  mx-auto p-6 ">
      <h2 className="text-xl font-bold mb-6">Create a New Post</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Cover Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          <IKContext
            publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            authenticator={authenticator}
          >
          
            <IKUpload
              fileName="abc.jpg"
              // tags={["tag1"]}
              useUniqueFileName={true}
              // isPrivateFile={false}
              onSuccess={handleSuccess}
            />
          </IKContext>
            {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full border p-2 rounded"
          />
          {coverImage && (
            <img
              src={coverImage}
              alt="Cover Preview"
              className="mt-4 h-64 object-cover rounded-lg shadow"
            />
          )} */}
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border rounded p-2"
            placeholder="Enter post title"
          />
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-lg">
            Choose a category:
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-xl bg-white shadow-md"
             {...register("category", { required: true })}
          >
            <option value="General">General</option>
            <option value="Tech">Tech</option>
            <option value="Cinema">Movies & WebSeries</option>
            <option value="Travel">Travel</option>
            <option value="Sports">Sports</option>
          </select>
        </div>

        {/* Short Description */}
        <div>
          <label className=" mb-1 font-medium">Short Description</label>
          <textarea
            {...register("shortDescription", { required: true })}
            className="w-full border rounded p-2"
            rows="1"
            placeholder="A quick summary of your post..."
          />
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className=" mb-1 font-medium">Post Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={quillModules}
            className="bg-white rounded-xl h-[300px] flex-1"
            placeholder="Write your post here..."
          />
        </div>
        <div>
          <button
            type="submit"
            className="   bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold mt-10"
          >
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
