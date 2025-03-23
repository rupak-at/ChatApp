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
        if (friend?.friend._id === action.payload?.userId) {
          return {
            ...friend,
            friend: { ...friend.friend, isOnline: action.payload?.isOnline },
          };
        }
        return friend;
      });
    },
    changeFriendListOrder: (state, action) => {
      console.log("inside slice")
      // const messagingFriend = state.friendList.find(
      //   ({friend}) => friend?._id === action.payload
      // );
      // console.log(state.friendList)
      // console.log(action.payload)

      // const f = state.friendList.map((f) => f.friend._id === action.payload)
      // console.log(f);
      // console.log(messagingFriend)

      // const newFriendList = state.friendList.filter(
      //   (friend) => friend?.friend._id !== action.payload
      // );

      // state.friendList = [messagingFriend, ...newFriendList];
    },
    removeFriendList: (state) => {
      state.friendList = [];
    },
  },
});

export const { setFriendList, removeFriendList, updateFriendOnlineStatus, changeFriendListOrder } =
  friendListSlice.actions;
export default friendListSlice.reducer;
