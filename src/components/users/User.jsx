import React from "react";
import styles from "./Users.module.css";
import {fetchDeleteUser} from "../../redux/fetchUsers";
import {useDispatch} from "react-redux";

const User = ({token,user}) => {
    const dispatch = useDispatch();
    const {id} = user;
    return (
        <li className={styles.user}>
            <span className={styles["user-info"]}>
                <span>{user.name}</span>
                <span>{user.email}</span>
            </span>
            <span className={styles["user-btn"]}>
                <button>Edit</button>
                <button onClick={()=>dispatch(fetchDeleteUser({token, id}))}>Delete</button>
            </span>
        </li>
    )
}

export default User;