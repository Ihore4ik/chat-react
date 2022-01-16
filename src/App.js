import React from "react";
import Chat from "./components/chat/Chat";
import Auth from "./components/auth/Auth";
import {Route, Routes, Link} from "react-router-dom";
import IsAuth from "./components/isAuth/IsAuth";
import './App.css';
import Users from "./components/users/Users";
import IsAuthAdmin from "./components/isAuth/IsAuthAdmin";
import styles from "./components/chat/Chat.module.css";
import {useSelector} from "react-redux";

function App() {
    const {error} = useSelector(state=>state.chat);
    return (
        <div className="App">

            <header className="header">
                <Link to="/login">Login</Link>
                <Link to="/">Chat</Link>
                <Link to="/users">Users</Link>
            </header>
            {error && <h2 className={styles.error}>An error occured: {error}</h2>}
            <Routes>
                <Route path="/" element={
                    <IsAuth>
                        <Chat url="https://bsa-chat.azurewebsites.net/api/Messages"/>
                    </IsAuth>
                }/>
                <Route path="/users" element={
                    <IsAuthAdmin>
                        <Users/>
                    </IsAuthAdmin>
                }/>
                <Route path="/login" element={<Auth/>}/>
            </Routes>
        </div>
    );
}

export default App;
