import React, { useState } from "react";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery, triggerRefresh } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [query,setQuery] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchJobHandler = ()=>{
    dispatch(setSearchQuery(query))
    dispatch(triggerRefresh()); 
    navigate("/browse")
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="px-4 py-2 rounded-full font-medium bg-gray-100 text-[#8B2323]">
          Find Jobs. Build Dreams.
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> <span className="text-[teal]">Get Hired</span>
        </h1>
        <p>
          Unlock your career potential with thousands of job opportunities at
          your fingertips. Search, apply, and land your dream job all in one
          place.
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find Your Dream Jobs"
            onChange={(e)=>setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button onClick={searchJobHandler} className="rounded-r-full bg-[brown] cursor-pointer">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
