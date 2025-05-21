import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchComments = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/${slug}`);
  return res.data;
};

const CommentShow = ({ postSlug }) => {
  const { data: comments, isLoading, error } = useQuery({
    queryKey: ["comments", postSlug],
    queryFn: () => fetchComments(postSlug),
    enabled: !!postSlug, // only fetch if postSlug is truthy
  });

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div>Failed to load comments</div>;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="mb-4 border-b border-gray-200 pb-3">
            <p className="font-medium">{comment.username || "Anonymous"}</p>
            <p className="text-gray-700">{comment.desc}</p>
            <small className="text-gray-400">
              {new Date(comment.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentShow;
