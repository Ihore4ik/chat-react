import {createAsyncThunk} from "@reduxjs/toolkit";
import {createMessage, deleteMessage, editMessage} from "./chatSlice";


export const fetchMessages = createAsyncThunk(
    'chatState/fetchMessages',
    async ({url, token}, {rejectWithValue}) => {
        try {
            const response = await fetch(url, {
                headers: {Authorization: `Bearer ${token}`}
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
export const fetchOwnMessage = createAsyncThunk(
    'chatState/fetchOwnMessage',
    async ({token, inputValue}, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch("https://bsa-chat.azurewebsites.net/api/Messages", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'accept': 'text/plain',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: inputValue
                })
            })
            if (!response.ok) {
                throw new Error("Wrong url!");
            }
            const temp = await response.json();
            dispatch(createMessage(temp));
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)
export const fetchDeleteMessage = createAsyncThunk(
    'chatState/fetchDeleteMessage',
    async ({token, id}, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`https://bsa-chat.azurewebsites.net/api/Messages/${id}`, {
                method: "DELETE",
                headers: {
                    'accept':' */*',
                    Authorization: `Bearer ${token}`
                }
            })
            if (!response.ok) {
                throw new Error("Wrong url!");
            }
            dispatch(deleteMessage(id));
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)
export const fetchUpdateMessage = createAsyncThunk(
    'chatState/fetchUpdateMessage',
    async ({token,editedMessageId,text}, {rejectWithValue, dispatch}) => {

        try {
            const response = await fetch(`https://bsa-chat.azurewebsites.net/api/Messages/${editedMessageId}`, {
                method: "PUT",
                headers: {
                    'accept':'text/plain',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    text
                })
            })
            if (!response.ok) {
                throw new Error("Wrong url!");
            }
            const mes = await response.json();
            dispatch(editMessage(mes));
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

