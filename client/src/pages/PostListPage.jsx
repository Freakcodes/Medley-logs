import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../components/PostCard"; // this should render your posts nicely
import { useNavigate } from "react-router-dom";
const PostListPage = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const navigate=useNavigate();
  // Fetch posts using react-query
  const fetchPosts = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
    return res.data;
  };

  const { isPending, error, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  useEffect(() => {
    if (!posts) return;

    let filtered = posts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected type
    if (selectedType !== "All") {
      filtered = filtered.filter((post) => post.category === selectedType);
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedType, posts]);

  if (isPending) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-10">An error occurred: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Post List</h1>

      {/* Search & Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-full"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg"
        >
          <option value="General">General</option>
            <option value="Tech">Tech</option>
            <option value="Cinema">Movies & WebSeries</option>
            <option value="Travel">Travel</option>
            <option value="Sports">Sports</option>
        </select>
      </div>

      {/* Post List */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div >
            <PostCard key={post._id} data={post}/>
            </div>
            
          ))
        ) : (
          <div className="text-center text-gray-500">No posts found.</div>
        )}
      </div>
    </div>
  );
};

export default PostListPage;
