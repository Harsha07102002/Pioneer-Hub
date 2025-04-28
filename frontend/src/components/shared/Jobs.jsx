import React, { useEffect } from "react";
import Navbar from "./Navbar";
import FilterCard from "./FilterCard";
import SingleJob from "./SingleJob";
import { useSelector, useDispatch } from "react-redux";
import { motion as Motion } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setFilteredJobs } from "../redux/jobSlice"; // Assuming you have this action to store filtered jobs

export default function Jobs() {
  useGetAllJobs(); // This hook fetches all jobs from the database
  const { allJobs, searchQuery, filterValue, filteredJobs } = useSelector(
    (store) => store.job
  );
  const dispatch = useDispatch();

  // Handle filtering logic
  useEffect(() => {
    let filteredJobs = allJobs;

    // Apply search query if it exists
    if (searchQuery) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters from Redux store
    if (filterValue) {
      if (filterValue.type === "Location") {
        filteredJobs = filteredJobs.filter((job) =>
          job.location.toLowerCase().includes(filterValue.value.toLowerCase())
        );
      } else if (filterValue.type === "Role") {
        filteredJobs = filteredJobs.filter((job) =>
          job.title.toLowerCase().includes(filterValue.value.toLowerCase())
        );
      } else if (filterValue.type === "Salary") {
        filteredJobs = filteredJobs.filter((job) => {
          if (filterValue.value === "0-40K") return job.salary < 40000;
          if (filterValue.value === "42K-1lakh")
            return job.salary >= 42000 && job.salary <= 100000;
          if (filterValue.value === "1lakh to 5lakh")
            return job.salary > 100000;
          return false;
        });
      }
    }

    // Update filteredJobs state in Redux
    dispatch(setFilteredJobs(filteredJobs));
  }, [allJobs, searchQuery, filterValue, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-[20%]">
            <FilterCard />
          </div>
          {filteredJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="w-full lg:flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {allJobs.map((job) => (
                  <Motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job._id}
                  >
                    <SingleJob job={job} />
                  </Motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
