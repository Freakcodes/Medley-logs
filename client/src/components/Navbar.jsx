import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
export const Navbar = () => {
  //lets design navbar
  const [open, setOpen] = useState(false);
  const { getToken, isSignedIn } = useAuth();

  return (
    <div className=" flex items-center justify-between overflow-x-hidden">
      <Link
        className=" text-lg xl:text-2xl 2xl:text-2xl font-bold font-sans cursor-pointer"
        to="/"
      >
        Medley-Logs
      </Link>
      {/* Mobile Menu */}
      <div className="md:hidden">
        <div
          className="cursor-pointer text-4xl"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? "X" : "≡"}
        </div>
        {
          open && <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-16 absolute top-16 left-0 bg-[#e6e6ff] transition-transform duration-300 ease-in-out transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <Link to="/" onClick={()=>(setOpen(!open))} >Home</Link>
          {isSignedIn && <Link to="/myposts" onClick={()=>(setOpen(!open))}>MyPosts</Link>}
          <Link to="/saved-posts" onClick={()=>(setOpen(!open))} >Saved Posts</Link>
          <SignedOut>
            {/* <SignInButton/> */}
            <Link
              to="/login"
              className=" bg-blue-400 rounded py-0.5 px-4 text-white round-3xl"
            >
              Login
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        }
        
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex font-medium">
        <div className="flex gap-20">
          <Link to="/">Home</Link>
          <Link to="/posts"> Read Posts</Link>
          {isSignedIn && <Link to="/myposts">MyPosts</Link>}
          {isSignedIn && <Link to="/saved-posts">Saved Posts</Link>}

          <SignedOut>
            {/* <SignInButton/> */}
            <Link
              to="/login"
              className=" bg-blue-400 rounded py-0.5 px-4 text-white round-3xl"
            >
              Login
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </div>
  );
};
