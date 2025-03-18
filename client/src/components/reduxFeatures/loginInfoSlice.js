const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    userInfo: {
        username: "",
        email: "",
        _id: "",
        avatar: "",
    },    
};

const loginInfoSlice = createSlice({
    name: "UserInfo",
    initialState,
    reducers: {
        loadUserInfo : (state, action)=>{
            state.userInfo = action.payload
        }, 
        removeUserInfo : (state)=>{
            state.userInfo = {
                username: "",
                email: "",
                _id: "",
                avatar: "",
            }
        }
    }
})

export const {loadUserInfo, removeUserInfo} = loginInfoSlice.actions
export default loginInfoSlice.reducer
    
