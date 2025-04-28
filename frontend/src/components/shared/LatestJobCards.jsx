import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function LatestJobCards({ job }) {
  const navigate = useNavigate();
  return (
    <div className="p-4 sm:p-6 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-sky-800 font-bold" variant="default">
          {job?.position} Positions
        </Badge>
        <Badge className="text-rose-800 font-bold" variant="default">
          {job?.jobType}
        </Badge>
        <Badge className="text-emerald-800 font-bold" variant="default">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex justify-center mt-4">
        <Button
          onClick={() => navigate(`/jobs/description/${job._id}`)}
          className="bg-[brown] text-white hover:bg-white hover:text-[brown] w-full sm:w-auto"
        >
          Go To Job
        </Button>
      </div>
    </div>
  );
}
