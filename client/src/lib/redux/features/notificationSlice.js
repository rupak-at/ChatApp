const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    notificationNumber: 0,
}

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotificationNumber: (state, action) => {
            state.notificationNumber = action.payload
        }
    }
})

export const { setNotificationNumber } = notificationSlice.actions
export default notificationSlice.reducer