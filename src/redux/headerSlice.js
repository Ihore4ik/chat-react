import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";



export const headerData = createAsyncThunk(
    'headerState/headerData',
    async (_, {getState}) => {
        // try {
            // const response = await fetch()
            // if (!response.ok) {
            //     throw new Error("Wrong url!");
        //     }
        //     return await response.json();
        // } catch (error) {
        //     return rejectWithValue(error.message);
        // }
        const messages = getState().chat.messages;
        const messagesCount = messages.length;
        const usersAll = [...new Set(messages.map(message => message.userId))].length;
        countMessage()
        return {
            messagesCount,
            usersAll
        }
        // const getLastMessage = (arrOfMessages) => {
        //     const arr = [];
        //     arrOfMessages.forEach(message => {
        //         arr.push(message.editedAt || message.createdAt)
        //     });
        //     return Math.max(...arr.map(date => new Date(date).getTime()));
        // };
    }
)


const headerSlice = createSlice({
    name: "headerSlice",
    initialState: {
        messagesCount: 0,
        usersAll: 0,
        lastMessage: null
    },
    reducers: {
        countMessage(state, action) {
            state.messagesCount = action.payload.messagesCount;
        },
        countUsers(state, action) {
            state.usersAll = action.payload.usersAll;
        },
        lastMessage(state, action) {
            state.lastMessage = action.payload;
        }
    }
    // extraReducers: {
    //     [fetchMessages.pending]: (state) => {
    //         state.preloader = true;
    //     },
    //     [fetchMessages.fulfilled]: (state, action) => {
    //         state.preloader = false;
    //         state.messages = action.payload;
    //         state.error = null;
    //     },
    //     [fetchMessages.rejected]: (state, action) => {
    //         state.preloader = false;
    //         state.error = action.payload;
    //     }
    // }
})

export const {countMessage, countUsers, lastMessage} = headerSlice.actions;
export default headerSlice.reducer;