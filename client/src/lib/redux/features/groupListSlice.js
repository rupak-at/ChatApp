import { Ga_Maamli } from "next/font/google";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  groupList: [],
};

const groupListSlice = createSlice({
  name: "groupList",
  initialState,
  reducers: {
    setGroupList: (state, action) => {
      state.groupList = action.payload;
    },
    updateGroupListOrder: (state, action) => {
      const chatId = action.payload;

      const chat = state.groupList.find((c) => c?.chatId === chatId);

      if (!chat) return;

      const newList = state.groupList.filter((c) => c?.chatId !== chatId);

      state.groupList = [chat, ...newList];
    },

    updateLastMessageGroup: (state, action) => {
      const { chatId, sender, content } = action.payload;
      state.groupList = state.groupList.map((group) => {
        if (group?.chatId === chatId) {
          return {
            ...group,
            lastMessage: { ...group?.lastMessage, sender, content },
          };
        }
        return group;
      });
    },

    addGroupList: (state, action) => {
      state.groupList = [...state.groupList, action.payload];
    },

    groupRemoveAfterDeletion : (state, action) => {
      const chatId = action.payload
      const filteredGroupList = state.groupList.filter((g) => g?.chatId !== chatId)
      state.groupList = filteredGroupList
    },

    groupMemberCountUpdate: (state, action) => {
      const {groupID, memberID, isAdd} = action.payload
      if (isAdd) {
        const addMemberCount = state.groupList.map((g) => {
          if ( g.chatId === groupID ){
            g.group.participants.push(memberID)
            return g
          }
          return g;
        })
        state.groupList = addMemberCount
      }else {
        const removeMemberCount = state.groupList.map((g) => {
          if ( g.chatId === groupID ){
            g.group.participants.filter((f) => f._id !== memberID )
            return g
          }
          return g;
        })

        state.groupList = removeMemberCount
      }

      
    },
    removeGroupList: (state) => {
      state.groupList = [];
    },
  },
});

export const {
  setGroupList,
  updateGroupListOrder,
  updateLastMessageGroup,
  removeGroupList,
  addGroupList,
  groupRemoveAfterDeletion,
  groupMemberCountUpdate
} = groupListSlice.actions;
export default groupListSlice.reducer;
