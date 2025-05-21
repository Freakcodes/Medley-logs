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
  const {getToken,isSignedIn}=useAuth();

  useEffect(()=>{
    // getToken().then((token)=>{
    //   console.log(token);
    // })
  },[])
  
  return (
    <div className=" flex items-center justify-between">
      <h1 className=" text-lg xl:text-2xl 2xl:text-2xl font-bold">
        Medley-Logs
      </h1>
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
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-16 absolute top-16 bg-[#e6e6ff] transition-all ease-in-out ${
            open ? "right-0" : "right-[-100%]"
          }`}
        >
          <Link to="/">Home</Link>
          {isSignedIn && <Link to="/">MyPosts</Link>}
          <Link to="/">Most Popular</Link>
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
