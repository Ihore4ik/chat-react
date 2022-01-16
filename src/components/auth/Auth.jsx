import React from "react";
import {fetchAuthUser} from "../../redux/fetchAuth";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import styles from"./Auth.module.css";
import {logoutUser} from "../../redux/chatSlice";

function Auth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {authUser} = useSelector(state=>state.chat);
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const user = {};

        for (let entry of formData.entries()) {
            user[entry[0]] = entry[1]
        }
        const {email, password} = user;

        dispatch(fetchAuthUser({email, password}));
    }
    return (
            authUser ? <button onClick={()=>dispatch(logoutUser())}>Log Out</button>
                : <form
                    className={styles.form}
                    onSubmit={(event) => handleSubmit(event)}
                >
                    <input type="text" placeholder="Email" name="email"/>
                    <input type="text" placeholder="Password" name="password"/>
                    <button>Login</button>
                </form>
    )
}

export default Auth;