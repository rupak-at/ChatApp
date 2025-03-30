import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendRequestDetails: [],
};

const friendRequestDetailsSlice = createSlice({
  name: "friendRequestDetails",
  initialState,
  reducers: {
    setFriendRequestDetails: (state, action) => {
      state.friendRequestDetails = action.payload;
    },
    removeFriendRequestDetails: (state, action) => {
      const requestId = action.payload;
      const filteredRequests = state.friendRequestDetails.filter((r) => r.requestId !== requestId);
      state.friendRequestDetails = filteredRequests;
    },
  },
});

export const { setFriendRequestDetails, removeFriendRequestDetails } =
  friendRequestDetailsSlice.actions;
export default friendRequestDetailsSlice.reducer;
