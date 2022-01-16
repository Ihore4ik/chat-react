import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchUsers = createAsyncThunk(
    'chatState/fetchUsers',
    async ({token}, {rejectWithValue}) => {
        try {
            const response = await fetch("https://bsa-chat.azurewebsites.net/api/Users",{
                headers: { Authorization:  `Bearer ${token}`  }
            })
            if (!response.ok) {
                throw new Error("Wrong url!");
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)
export const fetchMessages = createAsyncThunk(
    'chatState/fetchMessages',
    async ({url}, {rejectWithValue}) => {
        try {
            const response = await fetch(url,{
                headers: { Authorization: ' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRyeWFwaXRzaW4xOTkwQGdtYWlsLmNvbSIsIm5hbWVpZCI6IjExIiwicm9sZSI6IlVzZXIiLCJuYmYiOjE2NDIyNzAwMTEsImV4cCI6MTY0NTg3MDAxMSwiaWF0IjoxNjQyMjcwMDExfQ.3RrP7aK5usDq0Wj5HJ_3op87zrYGOeyB1olexPH5wM0' }
            })
            if (!response.ok) {
                throw new Error("Wrong url!");
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)
export const fetchAuthUser = createAsyncThunk(
    'chatState/fetchAuthUser',
    async ({email,password},{rejectWithValue}) => {
        try {
            const response = await fetch('https://bsa-chat.azurewebsites.net/api/Auth/login',
                {
                    method: "POST",
                    headers: {
                        'accept': 'text/plain',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "email": email,
                        "password": password
                    })
                })
            if (!response.ok) {
                throw new Error("Wrong url!");
            }
            return await response.json();
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

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
            state.messages.push({
                "id": Date.now(),
                "userId": "Me1990",
                "myOwn": true,
                "user": "Me",
                "text": action.payload,
                "createdAt": new Date().toISOString(),
                "editedAt": ""
            })
        },
        deleteMessage(state, action) {
            state.messages = state.messages.filter(message => message.id !== action.payload);
        },
        addMessageId(state, action) {
            state.editedMessageId = action.payload;
        },
        openModal(state){
            state.editModal = true;
        },
        closeModal(state){
            state.editModal = false;
        },
        editMessage(state,action) {
            state.messages = state.messages.map(item=> {
                if(item.id === action.payload.id){
                  return  action.payload;
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
        [fetchUsers.fulfilled]: (state,action) => {
            state.users = action.payload;
        },
        [fetchAuthUser.pending] : (state) => {
            state.preloader = true;
        },
        [fetchAuthUser.fulfilled] : (state,action) => {
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
    createMessage, deleteMessage, editMessage,closeModal,openModal,addMessageId
} = chatSlice.actions;
export default chatSlice.reducer;