import { setAllJobs, setSearchQuery } from "@/components/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { refreshKey, searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const savedQuery = localStorage.getItem("searchQuery") || "";
    if (!searchQuery && savedQuery) {
      if (savedQuery.trim() === "") {
        localStorage.removeItem("searchQuery");
      } else {
        dispatch(setSearchQuery(savedQuery));
      }
    }
    const fetchAllJobs = async () => {
      try {
        let url = `${JOB_API_END_POINT}/get/`;
        if (savedQuery) {
          url += `?keyword=${savedQuery}`;
        }
        const res = await axios.get(url, {
          withCredentials: true,
        });
        if (res?.data?.success) {
          console.log(res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
        dispatch(setAllJobs([]));
      }
    };

    fetchAllJobs();
  }, [dispatch, refreshKey, searchQuery]);
};

export default useGetAllJobs;
