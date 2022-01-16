import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchAuthUser = createAsyncThunk(
    'chatState/fetchAuthUser',
    async ({email, password}, {rejectWithValue}) => {
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