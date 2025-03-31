import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendRequestDetails: [],
};

const friendRequestDetailsSlice = createSlice({
  name: "friendRequestDetails",
  initialState,
  reducers: {
    setFriendRequestDetails: (state, action) => {
      const nonDuplicateRequests = action.payload.filter((r) => !state.friendRequestDetails.some((request) => request.requestId === r.requestId));
      state.friendRequestDetails = [...state.friendRequestDetails, ...nonDuplicateRequests];
    },
    addFriendRequestDetails: (state, action) => {
      if (state.friendRequestDetails.length === 0) {
        state.friendRequestDetails = [action.payload];
      }else {
        state.friendRequestDetails = [...state.friendRequestDetails, action.payload];
      }
    },
    removeFriendRequestDetails: (state, action) => {
      const requestId = action.payload;
      const filteredRequests = state.friendRequestDetails.filter((r) => r.requestId !== requestId);
      state.friendRequestDetails = filteredRequests;
    },
    removeWhileLogout: (state) =>{
      state.friendRequestDetails = [];
    },
  },
});

export const { setFriendRequestDetails, removeFriendRequestDetails, addFriendRequestDetails, removeWhileLogout } =
  friendRequestDetailsSlice.actions;
export default friendRequestDetailsSlice.reducer;
