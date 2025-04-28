import React, { } from "react";
import Navbar from "./Navbar";
import SingleJob from "./SingleJob";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";

export default function Browse() {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.length > 0 ? (
            allJobs.map((job) => (
              <div key={job._id}>
                <SingleJob job={job} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center">
              No jobs found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
