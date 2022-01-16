import React from "react";
import styles from "./Users.module.css";

const User = ({user}) => {
    return (
        <li className={styles.user}>
            <span className={styles["user-info"]}>
                <span>{user.name}</span>
                <span>{user.email}</span>
            </span>
            <span className={styles["user-btn"]}>
                <button>Edit</button>
                <button>Delete</button>
            </span>
        </li>
    )
}

export default User;