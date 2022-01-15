import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const fetchMessages = createAsyncThunk(
    'chatState/fetchMessages',
    async ({url}, {rejectWithValue}) => {
        try {
            const response = await fetch(url,)
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
        editedMessageId: null
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
        }
    }
})

export const {
    createMessage, deleteMessage, editMessage,closeModal,openModal,addMessageId
} = chatSlice.actions;
export default chatSlice.reducer;