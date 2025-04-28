import React, { useState } from "react";
import Navbar from "./Navbar";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "../ui/badge";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGeAppliedJobs";

export default function Profile() {
  useGetAppliedJobs()
  let isResume = false,isApplied = false;
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  if(user?.fullname){
    isResume = true
    isApplied = true
  }
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={!user?.profile?.profilePhoto? "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg":user?.profile?.profilePhoto } />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">
                {user?.fullname != null ? user?.fullname : "Your Name"}
              </h1>
              <p>{user?.profile?.bio != null ? user?.profile?.bio : "Your Bio"}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right cursor-pointer"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email != null ? user?.email : "Your Email"}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>
              {user?.phoneNumber != null
                ? user?.phoneNumber
                : "Your Phone Number"}
            </span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="text-lg font-bold">Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills ? (
              user.profile.skills.length !== 0 ? (
                user.profile.skills.map((item, index) => (
                  <Badge variant="destructive" key={index}>
                    {item}
                  </Badge>
                ))
              ) : (
                <span>NA</span>
              )
            ) : (
              <span>Your Skills</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5 my-5">
          <h1 className="text-lg font-bold">Resume</h1>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-[teal] w-full hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName?user?.profile?.resumeOriginalName:'Your Resume'}
            </a>
          ) : (
            <span>Resume Not Availbale</span>
          )}
        </div>
        <div className="my-5">
          <h1 className="text-lg font-bold">Applied Jobs</h1>
          {isApplied?<AppliedJobTable />:"Your Applied Jobs"}
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
