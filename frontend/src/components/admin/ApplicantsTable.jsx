import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

export default function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const shortListStatus = ['Accepted','Rejected']
  const statusHandler = async (status,id)=>{
    try{
        axios.defaults.withCredentials = true
        const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status})
        if(res.data.success){
            toast.success(res.data.message)
        }
    }catch(error){
        toast.error(error.response.data.message)
    }
  }
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent job applied users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]">Full Name</TableHead>
            <TableHead className="w-[25%]">Email</TableHead>
            <TableHead className="w-[20%]">Contact</TableHead>
            <TableHead className="w-[20%]">Date</TableHead>
            <TableHead className="w-[15%] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell className="w-[20%]">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell className="w-[25%]">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell className="w-[20%]">
                  {item?.applicant?.phoneNumber}
                </TableCell>
                <TableCell className="w-[20%]">
                  {item?.applicant?.createdAt?.split("T")[0]}
                </TableCell>
                <TableCell className="w-[15%] text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="bg-black text-white">
                      {shortListStatus.map((status, index) => (
                        <div
                        onClick={()=>statusHandler(status,item?._id)}
                          key={index}
                          className="flex w-fit items-center my-2 cursor-pointer"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
