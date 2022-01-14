import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";



export const fetchMessages = createAsyncThunk(
    'chatState/fetchMessages',
    async ({url}, {rejectWithValue}) => {
        try {
            const response = await fetch(url)
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
        error: null
    },
    reducers: {
        createMessage(state, action) {
            state.messages.push({
                "id": Date.now(),
                "userId": "Me1990",
                "myOwn": true,
                "user": "Me",
                "text": action.payload.text,
                "createdAt": new Date().toISOString(),
                "editedAt": ""
            })
        },
        deleteMessage(state, action) {
        },
        editMessage(state, action) {
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
        }
    }
})

export const {createMessage, deleteMessage, editMessage} = chatSlice.actions;
export default chatSlice.reducer;