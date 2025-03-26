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
} = groupListSlice.actions;
export default groupListSlice.reducer;
