import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DOMPurify from "dompurify";
import { formatDistanceToNow } from "date-fns";
import CommentForm from "../components/CommentForm";
import Comments from "../components/Comments";
import CommentShow from "../components/CommentShow";
import SavePostButton from "../components/SavePostButton";
import DeletePostButton from "../components/DeletePostButton";
import { useAuth,useUser } from "@clerk/clerk-react";
const SinglePostPage = () => {
  const { slug } = useParams();
  const user=useUser();
  const username=user.user?.username;
  const currentUserId=user.user?.isSignedIn;
  
  
  // Fetch single post by slug
  const fetchPost = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
    return res.data;
  };

  const { isPending, error, data: post } = useQuery({
    queryKey: ["post", slug],
    queryFn: fetchPost,
  });

  if (isPending) {
    return <div className="text-center text-gray-600 py-12">Loading post...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-12">Error loading post: {error.message}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Banner image */}
      <img
        src={post.img}
        alt={post.title}
        className="w-full h-full object-cover rounded-xl mb-6"
      />

      {/* Title and meta */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{post.title}</h1>
      <div className="flex gap-4">
        {
          currentUserId &&  <SavePostButton slug={slug}/>
        }
       
      {
        post.createdBy===username && <DeletePostButton slug={slug}/>
      }
      </div>
      
      
      <div className="text-sm text-gray-500 mb-6">
        {/* {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })} · Category:{" "} */}
        <span className="capitalize font-medium">{post.category}</span>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700 mb-6">{post.desc}</p>

      {/* Content */}
      <div
        className="prose max-w-none prose-indigo"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(post.content),
        }}
      />
      
      {/* <Comments slug={slug}/> */}
      <CommentShow postSlug={slug}/>
      <CommentForm slug={slug}/>
    </div>
  );
};

export default SinglePostPage;
