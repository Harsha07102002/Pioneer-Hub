import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

export default function SingleJob({ job }) {
  const navigate = useNavigate();
  const createdDate = new Date(job?.createdAt);
  const today = new Date();
  const timeDiff = today - createdDate;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return (
    <div className="p-5 rounded-md shadwo-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysDiff > 0 ? `${daysDiff} days ago` : <span>Today</span>}
        </p>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button>
          <Avatar>
            <AvatarImage
              src={job?.company?.logo || "/placeholder.png"}
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
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
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => navigate(`/jobs/description/${job._id}`)}
          className="bg-[brown] text-white hover:bg-white hover:text-[brown] cursor-pointer"
        >
          Details
        </Button>
        
      </div>
    </div>
  );
}
