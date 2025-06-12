import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
const CommentForm = ({ slug }) => {
  const {getToken}=useAuth();
  const token=getToken();
  const [desc, setDesc] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation({

    mutationFn: async (newComment) => {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${slug}`,
        newComment,
       {
        headers:{
          Authorization:`Bearer ${token}`
        }
       }// if needed for cookies/auth
      );
      return res.data;
    },
    onSuccess: () => {
      setDesc("");
      queryClient.invalidateQueries(["comments", slug]); // refetch comments
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!desc.trim()) return;
    mutate({ desc });
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Write a comment..."
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={3}
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {isPending ? "Posting..." : "Post Comment"}
        </button>
      </form>
      {isError && <p className="text-red-500 mt-2">Error: {error.message}</p>}
    </div>
  );
};

export default CommentForm;
