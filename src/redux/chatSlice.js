import {createSlice} from "@reduxjs/toolkit";
import {fetchMessages,fetchUsers,fetchAuthUser} from "./asyncFunc";


const chatSlice = createSlice({
    name: "chatState",
    initialState: {
        messages: [],
        editModal: false,
        preloader: true,
        error: null,
        editedMessageId: null,
        authUser: null,
        users: null
    },
    reducers: {
        createMessage(state, action) {
            state.messages.push(action.payload);
        },
        deleteMessage(state, action) {
            state.messages = state.messages.filter(message => message.id !== action.payload);
        },
        addMessageId(state, action) {
            state.editedMessageId = action.payload;
        },
        openModal(state) {
            state.editModal = true;
        },
        closeModal(state) {
            state.editModal = false;
        },
        editMessage(state, action) {
            state.messages = state.messages.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            state.editedMessageId = null;
        },
    },
    extraReducers: {
        [fetchMessages.pending]: (state) => {
            state.preloader = true;
        },
        [fetchMessages.fulfilled]: (state, action) => {
            state.preloader = false;
            state.messages = action.payload;
            state.error = null;
        },
        [fetchMessages.rejected]: (state, action) => {
            state.preloader = false;
            state.error = action.payload;
        },
        [fetchUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
        },
        [fetchAuthUser.pending]: (state) => {
            state.preloader = true;
        },
        [fetchAuthUser.fulfilled]: (state, action) => {
            state.preloader = false;
            state.error = null;
            state.authUser = action.payload;
        },
        [fetchAuthUser.rejected]: (state, action) => {
            state.preloader = false;
            state.error = action.payload;
        },
    }
})

export const {
    createMessage, deleteMessage, editMessage, closeModal, openModal, addMessageId
} = chatSlice.actions;
export default chatSlice.reducer;