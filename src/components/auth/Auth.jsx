import React from "react";
import {fetchAuthUser} from "../../redux/chatSlice";
import {useDispatch} from "react-redux";
import styles from"./Auth.module.css";

function Auth() {
    const dispatch = useDispatch();
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
        <form

            className={styles.form}
            onSubmit={(event) => handleSubmit(event)}
        >
            <input type="text" placeholder="Email" name="email"/>
            <input type="text" placeholder="Password" name="password"/>
            <button>Login</button>
        </form>
    );
}

export default Auth;