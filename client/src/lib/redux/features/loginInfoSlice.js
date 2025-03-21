const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    userInfo: {},    
};

const loginInfoSlice = createSlice({
    name: "UserInfo",
    initialState,
    reducers: {
        loadUserInfo : (state, action)=>{
            state.userInfo = action.payload
        }, 
        removeUserInfo : (state)=>{
            state.userInfo = {}
        }
    }
})

export const {loadUserInfo, removeUserInfo} = loginInfoSlice.actions
export default loginInfoSlice.reducer
    
