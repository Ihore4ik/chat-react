import React from "react";
import styles from "./OwnMessage.module.css"

const OwnMessage = ({message, getDate, deleteMessage, editMessage}) => {
    return (
        <div className={styles["own-message"]}>
            <div className={styles["own-message_events"]}>
                <button className={styles["message-edit"]}
                   onClick={editMessage}
                >Edit</button>
                <button
                    className={styles["message-delete"]}
                    onClick={deleteMessage}
                >Delete
                </button>
            </div>
            <div className={styles["own-message_desc"]}>
                <div className={styles["message-time"]}>
                    {getDate(message.editedAt || message.createdAt)}
                </div>
                <div className={styles["message-text"]}>
                    {message.text}
                </div>

                <div className={styles["message-like"]}>
                    like
                </div>
            </div>

        </div>
    )
};

export default OwnMessage;