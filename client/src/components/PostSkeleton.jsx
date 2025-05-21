const PostSkeleton = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow animate-pulse">
      <div className="h-48 bg-gray-200 rounded-md mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
      <div className="h-3 bg-gray-100 rounded w-1/4"></div>
    </div>
  );
};

export default PostSkeleton;