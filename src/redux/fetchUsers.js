import {createAsyncThunk} from "@reduxjs/toolkit";
import {addNewUser, deleteUser} from "./chatSlice";


export const fetchUsers = createAsyncThunk(
    'chatState/fetchUsers',
    async ({token}, {rejectWithValue}) => {
        try {
            const response = await fetch("https://bsa-chat.azurewebsites.net/api/Users", {
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

export const fetchAddUser = createAsyncThunk(
    'chatState/fetchAddUser',
    async ({token, name, email, password, avatar}, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch("https://bsa-chat.azurewebsites.net/api/Users", {
                method: "POST",
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    token, name, email, password, avatar
                })
            })
            if (!response.ok) {
                throw new Error("Wrong url!");
            }
            const user = await response.json();
            dispatch(addNewUser(user));
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

export const fetchDeleteUser = createAsyncThunk(
    'chatState/fetchDeleteUser',
    async ({token, id}, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`https://bsa-chat.azurewebsites.net/api/Users/${id}`, {
                method: "DELETE",
                headers: {
                    'accept': '*/*',
                    Authorization: `Bearer ${token}`
                }
            })
            if (!response.ok) {
                throw new Error("Wrong url!");
            }
            dispatch(deleteUser(id));
        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)