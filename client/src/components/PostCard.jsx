import React from "react";
import { Link, useNavigate } from "react-router-dom";
const PostCard = ({ data }) => {
  
  return (
    <Link to={`${data.slug}`}>
  
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-2xl rounded-2xl transition hover:shadow-blue-200 cursor-pointer " >
      <img
        src={data.img}
        alt={data.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />
      <div className="flex flex-col gap-2">
        <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold">
          {data.category}
        </span>
        <h2 className="text-2xl font-bold text-gray-800">{data.title}</h2>
        <p className="text-gray-600 italic">{data.desc}</p>
        <div
          className="mt-4 prose max-w-none prose-p:my-2 prose-strong:text-blue-700 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        <div className="mt-6 text-sm text-gray-500">
          Posted on: {new Date(data.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
   </Link>
  );
};

export default PostCard;
