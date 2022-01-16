import {createSlice} from "@reduxjs/toolkit";
import {fetchMessages} from "./fetchMessages";
import {fetchUsers} from "./fetchUsers";
import {fetchAuthUser} from "./fetchAuth";


const chatSlice = createSlice({
    name: "chatState",
    initialState: {
        messages: [],
        editModal: false,
        preloader: true,
        error: null,
        editedMessageId: null,
        authUser: null,
        users: null,
        editedUserId: null
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
        addNewUser(state,action){
            state.users.push(action.payload);
        },
        addEditUser(state,action){
            state.editedUserId = action.payload;
        },
        deleteUser(state,action) {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser(state,action){
            state.users = state.users.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            })
            state.editedUserId = null;
        },logoutUser(state){
            state.authUser = null;
        }

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
    createMessage, deleteMessage, editMessage,deleteUser,addEditUser,
    closeModal, openModal, addMessageId,addNewUser,updateUser,logoutUser
} = chatSlice.actions;
export default chatSlice.reducer;