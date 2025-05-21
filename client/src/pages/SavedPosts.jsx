

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import PostSkeleton from "../components/PostSkeleton";
import { useAuth } from "@clerk/clerk-react";
const SavedPosts = () => {
    const {isSignedIn}=useAuth();
   
    
  const fetchMyPosts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/get-saved-posts`, {
      withCredentials: true, // required for Clerk auth
    });
    return res.data;
  };
  
  
  let { data: posts, isLoading, isError,error} = useQuery({
    queryKey: ["myPosts"],
    queryFn: fetchMyPosts,
  });

  
  posts=posts?.savedPosts;
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8">📝 My Posts</h2>

      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      )}

      {isError && (
        <div className="text-red-500 text-center">Failed to load your posts.</div>
      )}

      {posts && posts.length === 0 && (
        <div className="text-gray-500 text-center">You haven't written any posts yet.</div>
      )}

      {posts && posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link to={`/posts/${post.slug}`} key={post._id}>
              <article className="bg-white rounded-xl shadow hover:shadow-md transition">
                <img
                  src={post.img || "/placeholder.jpg"}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-4">
                  <span className="text-sm text-indigo-600 font-medium">#{post.category}</span>
                  <h3 className="text-lg font-semibold text-gray-800 mt-1">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.desc}</p>
                  <div className="mt-4 text-sm text-gray-500">
                    {post.createdBy} · {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default SavedPosts;
