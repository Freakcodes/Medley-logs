import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate,useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';


export default function DeletePostButton({ slug }) {
  const [ del, setDel] = useState(false);
  const navigate=useNavigate();
  const deletePost = async () => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/posts/${slug}`,
     
      { withCredentials: true }
    );
    return res.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess:(data)=>{
      navigate('/myPosts')
      },
    onError: (error) => {
      console.log(error);
      
      if (error.response?.status === 401) {
        toast.info("Unable to delete");
        setDel(true);
      } else {
        toast.error("Something went wrong!");
        console.error(error);
      }
    },
  });

  return (
    <>
      <button
        onClick={() => mutate()}
        disabled={isPending || del}
        className={`px-4 py-2 rounded-md text-sm font-medium transition 
          ${del ? 'bg-red-500 text-white' : 'bg-red-500 text-white hover:bg-red-600'} 
          disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isPending ? (
          <div className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l4-4-4-4v4a12 12 0 00-12 12h4z"
              ></path>
            </svg>
            
          </div>
        ) : del? (
          'Deleted'
        ) : (
          <Trash2/>
        )}
      </button>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}
