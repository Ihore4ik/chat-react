import { configureStore } from '@reduxjs/toolkit';
import chatReducer from "./chatSlice"
import headerReducer from "./headerSlice";

 const store = configureStore({
    reducer: {
        chat: chatReducer
        // header: headerReducer,
    },
});

export default store;

