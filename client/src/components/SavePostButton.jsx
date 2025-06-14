import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
export default function SavePostButton({ slug }) {
  const [saved, setSaved] = useState(false);
  const { getToken } = useAuth();
  const savePost = async () => {
      const token =await getToken();

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/save-post/${slug}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: savePost,
    onSuccess: () => {
      setSaved(true);
    },
    onError: (error) => {
      if (error.response?.status === 409) {
        toast.info("Post already saved!");
        setSaved(true);
      } else {
        toast.error("Something went wrong!");
        console.error(error);
      }
    },
  });

  return (
    <>
      <button
        onClick={() => mutate()}
        disabled={isPending || saved}
        className={`px-4 py-2 rounded-md text-sm font-medium transition 
          ${
            saved
              ? "bg-gray-500 text-white"
              : "bg-gray-500 text-white hover:bg-gray-600"
          } 
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l4-4-4-4v4a12 12 0 00-12 12h4z"
              ></path>
            </svg>
          </div>
        ) : saved ? (
          <BookmarkCheck />
        ) : (
          <Bookmark />
        )}
      </button>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}
