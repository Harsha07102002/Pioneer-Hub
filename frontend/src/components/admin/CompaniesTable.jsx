import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useNavigate } from "react-router-dom";

export default function CompaniesTable() {
  useGetAllCompanies()
  const navigate = useNavigate()
  const { companies,searchCompanyByText } = useSelector((store) => store.company); 
  const [filterCompany,setFilterCompany] = useState(companies)
  useEffect(()=>{
    const filteredCompany = companies.length >=0 && companies.filter((company)=>{
      if(!searchCompanyByText){
        return true
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filteredCompany)
  },[companies,searchCompanyByText])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!filterCompany || filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven't registered any company yet
              </TableCell>
            </TableRow>
          ) : ( 
            filterCompany.map((com) => (
              
              <TableRow key={com._id}>
                <TableCell>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={com.logo || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                      alt={com.name}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{com.name}</TableCell>
                <TableCell>{com.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={()=>navigate(`/admin/companies/${com._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
