import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendList: [],
};

const friendListSlice = createSlice({
  name: "friendList",
  initialState,
  reducers: {
    setFriendList: (state, action) => {
      state.friendList = action.payload;
    },
    updateFriendOnlineStatus: (state, action) => {
      state.friendList = state.friendList.map((friend) => {
        if (friend.friend._id === action.payload.userId) {
          return {
            ...friend,
            friend: { ...friend.friend, isOnline: action.payload.isOnline },
          };
        }
        return friend;
      });
    },

    removeFriendList: (state) => {
      state.friendList = [];
    },
  },
});

export const { setFriendList, removeFriendList, updateFriendOnlineStatus } =
  friendListSlice.actions;
export default friendListSlice.reducer;
