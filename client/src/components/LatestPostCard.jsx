import { Link } from "react-router-dom";
const LatestPostCard = ({ data }) => {
  if (!data) return null;

  return (
    <Link to={`posts/${data.slug}`}>
      <div className="bg-gradient-to-r from-indigo-100 to-blue-100 shadow-lg rounded-xl overflow-hidden hover:scale-[1.02] transition ">
        <img
          src={data.img}
          alt={data.title}
          className="w-full h-50 object-cover rounded-b-none"
        />
        <div className="p-5">
          <div className="text-sm uppercase font-semibold text-indigo-600 mb-1">
            {data.category}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-1">
            {data.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{data.desc}</p>
          <div className="flex justify-between">
            <div className="text-xs text-gray-500">
              Posted on {new Date(data.createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500">
              Created By : {data.createdBy}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LatestPostCard;
