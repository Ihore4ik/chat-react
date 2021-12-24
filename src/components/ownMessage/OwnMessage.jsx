import React from "react";
import styles from "./OwnMessage.module.css"

const OwnMessage = ({message,getDate}) => {
    return (
        <div className={styles["own-message"]}>
            <div className={styles["own-message_events"]}>
                <button className={styles["message-edit"]}>Edit</button>
                <button className={styles["message-delete"]}>Delete</button>
            </div>
<div className={styles["own-message_desc"]}>
    <div className={styles["message-time"]}>
        {getDate(message.editedAt || message.createdAt)}
    </div>
    <div className={styles["message-text"]}>
        {message.text}
    </div>

    <div className={styles["message-like"]}>
        12
    </div>
</div>

        </div>
    )
};

export default OwnMessage;