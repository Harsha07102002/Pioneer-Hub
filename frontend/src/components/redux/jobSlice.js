import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    filteredJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs: [],
    searchQuery: "",
    refreshKey: 0,
    filterValue: null,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setFilteredJobs: (state, action) => {
      state.filteredJobs = action.payload; // Store filtered jobs
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      if (action.payload) {
        localStorage.setItem("searchQuery", action.payload);
      } else {
        localStorage.removeItem("searchQuery");
      }
      state.searchedJobs = state.allJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          job.location.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    triggerRefresh: (state) => {
      state.refreshKey += 1;
    },
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchQuery,
  setFilterValue,
  triggerRefresh,
  setFilteredJobs,
} = jobSlice.actions;

export default jobSlice.reducer;
