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
        if (friend?.friend?._id === action.payload?.userId) {
          return {
            ...friend,
            friend: { ...friend.friend, isOnline: action.payload?.isOnline },
          };
        }
        return friend;
      });
    },
    changeFriendListOrder: (state, action) => {
      const messagingFriend = state.friendList.find(
        (f) => f?.chatId === action.payload
      );

      const newFriendList = state.friendList.filter(
        (friend) => friend?.chatId !== action.payload
      );

      state.friendList = [messagingFriend, ...newFriendList];
    },
    updateLastMessage: (state, action) => {
      const { chatId, lastMessage } = action.payload;
      state.friendList = state.friendList.map((friend) => {
        if (friend?.chatId === chatId) {
          return {
            ...friend,
            lastMessage,
          };
        }
        return friend;
      });
    },
    addFriendFromSocket: (state, action) => {
      state.friendList = [...state.friendList, action.payload];
    },
    removeFriendFromSocket: (state, action) => {
      state.friendList = state.friendList.filter((f) => f.chatId !== action.payload);
    },
    removeFriendList: (state) => {
      state.friendList = [];
    },
  },
});

export const {
  setFriendList,
  removeFriendList,
  updateFriendOnlineStatus,
  changeFriendListOrder,
  updateLastMessage,
  addFriendFromSocket,
  removeFriendFromSocket,
} = friendListSlice.actions;
export default friendListSlice.reducer;
