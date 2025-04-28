import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        loading:false,
        user:null,
        refreshKey: 0
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading = action.payload
        },
        setUser:(state,action)=>{
            state.user = action.payload
        },
        triggerRefresh: (state) => {
            state.refreshKey += 1;
          }
    }
})

export const {setLoading,setUser, triggerRefresh} = authSlice.actions
export default authSlice.reducer