import React, { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function JobDescription() {
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const [isApplied, setIsApplied] = useState(false);

  // Fetch Job Data
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch]);

  // Check if already applied (runs after job and user are available)
  useEffect(() => {
    if (singleJob && user?._id) {
      const applied = singleJob.applications?.some(
        (application) => application.applicant === user._id
      );
      setIsApplied(applied);
    }
  }, [singleJob, user?._id]);
  console.log(singleJob)
  // Handle Apply Button
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        toast.success(res.data.message);
        // Optionally refresh job data to get latest application count
        const updatedJob = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          {
            withCredentials: true,
          }
        );
        if (updatedJob.data.success) {
          dispatch(setSingleJob(updatedJob.data.job));
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const time = new Date(singleJob?.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-sky-800 text-md font-bold">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-rose-800 text-md font-bold">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-emerald-800 text-md font-bold">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={!isApplied ? applyJobHandler : undefined}
          disabled={isApplied}
          className={`rounded-lg text-white ${
            isApplied
              ? "bg-green-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
  Required Skills:{" "}
  <span className="pl-4 font-normal text-gray-800">
    {singleJob?.requirements.map((e, index) => (
      <span key={index}>
        {e}
        {index !== singleJob.requirements.length - 1 && ", "}
      </span>
    ))}
  </span>
</h1>

        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">{time}</span>
        </h1>
      </div>
    </div>
  );
}
