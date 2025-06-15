import React from 'react';
import { Link } from 'react-router-dom';
import { SquarePen } from 'lucide-react';

const UpdatePostButton = ({ slug }) => {
  return (
    <Link
      to={`/update-posts/${slug}`}
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md group"
    >
      <SquarePen className="w-5 h-5 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-200" />
      <span className="hidden sm:inline-block font-semibold">Edit Post</span>
    </Link>
  );
};

export default UpdatePostButton;
