import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name:"",
    age:""
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        addUser:(state,reducer)=>{
            return state.name = reducer.payload.name
        }
    }
})

export default userSlice.reducer