import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "../redux/authSlice";
import { toast } from "sonner";

export default function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <div>
          <h1 className="text-2xl font-bold text-[#008080]">
            <Link to="/">
              <span className="text-[brown]">Pioneer</span>Hub
            </Link>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ul className="flex font-medium items-center gap-5 text-[#8B2323]">
            {user && user.role === "recruiter" ? (
              <>
                <Link to="/admin/companies">
                  <li>Companies</li>
                </Link>
                <Link to="/admin/jobs">
                  <li>Jobs</li>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <li>Home</li>
                </Link>
                <Link to="/jobs">
                  <li>Jobs</li>
                </Link>
                <Link to="/browse">
                  <li>Browse</li>
                </Link>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className="bg-teal-600 text-white hover:bg-white hover:text-teal-600 cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#8B2323] text-white hover:bg-white hover:text-[#8B2323] cursor-pointer">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger onChild>
                <Avatar>
                  <AvatarImage className='cursor-pointer'
                    src={
                      !user?.profile?.profilePhoto
                        ? "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                        : user?.profile?.profilePhoto
                    }
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white">
                <div className="">
                  <div className="flex gap-2 space-y-2">
                    <Avatar>
                      <AvatarImage
                        src={
                          !user?.profile?.profilePhoto
                            ? "https://img.freepik.com/premium-vector/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3383.jpg"
                            : user?.profile?.profilePhoto
                        }
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio ? (
                          user?.profile?.bio
                        ) : (
                          <span className="text-sm">Yet to be written</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-2 text-[brown] bg-white">
                    {user && user.role === "student" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Link to="/profile">
                          <Button style={{ cursor: "pointer" }} variant="link">
                            View Profile
                          </Button>
                        </Link>
                      </div>
                    )}

                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button
                        onClick={logoutHandler}
                        style={{ cursor: "pointer" }}
                        variant="link"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}
