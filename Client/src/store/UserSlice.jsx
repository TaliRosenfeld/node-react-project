import { createSlice } from '@reduxjs/toolkit'
const initVal = {
       user:"" 
}                                                   
const userSlice = createSlice({
    name:"userName",
    initialState:initVal,
    reducers:{
        login:(state,action)=>{

            state.user=action.payload
            return state
        }
    }
})
export const { login } = userSlice.actions
export default userSlice.reducer





   
 