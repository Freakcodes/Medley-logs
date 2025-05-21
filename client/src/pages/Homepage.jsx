import React from "react";
import { Link } from "react-router-dom";
import Comments from "../components/Comments";
import LatestPostCard from "../components/LatestPostCard";
import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../components/PostSkeleton";
import axios from "axios";
import Footer from "../components/Footer";
const Homepage = () => {
  const fetchPosts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
    console.log(res.data);
    
    return res.data;
  };

  const { isLoading, error, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gray-50 py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700 mb-4">
            Your Thoughts, Your Voice — Medley-Logs
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            A modern blogging space where developers, writers, and thinkers come
            together to share insights, stories, and ideas — all in one medley.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/write"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-indigo-700 transition"
            >
              ✍️ Start Writing
            </Link>
            <Link
             to="/posts"
              className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg text-base font-medium hover:bg-indigo-50 transition"
            >
              📚 Browse Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Read Posts section */}
      <section className="max-w-6xl mx-auto px-4 mt-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Latest Posts</h2>
          {/* <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="General">General</option>
            <option value="Tech">Tech</option>
            <option value="Cinema">Movies & WebSeries</option>
            <option value="Travel">Travel</option>
            <option value="Sports">Sports</option>
          </select> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Post Card */}
          {/* <article className="bg-white rounded-xl shadow hover:shadow-md transition">
            <img
              src="/placeholder.jpg"
              alt="Post thumbnail"
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <span className="text-sm text-indigo-600 font-medium">#Tech</span>
              <h3 className="text-lg font-semibold text-gray-800 mt-1">
                Understanding React Hooks
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                A short summary of the post goes here...
              </p>
              <div className="mt-4 text-sm text-gray-500">
                By Alice · May 11, 2025
              </div>
            </div>
          </article> */}
          {
            isLoading &&
            <> 
            <PostSkeleton/>
            <PostSkeleton/>
            <PostSkeleton/>
            
            </>
            
          }
          { 
            posts?.map((data)=>(
              
              <LatestPostCard data={data} key={posts.slug}/>
            ))
          }
          
        </div>
      </section>
      <Footer/>
      
    </div>
  );
};




export default Homepage;
