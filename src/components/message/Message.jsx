import React from "react";
import styles from "./Message.module.css"

const Message = ({message,getDate,onLike}) => {
    return (
        <div className={styles.message}>
            <div className={styles["message-info"]}>
                <div className={styles["message-user-avatar"]}>
                    <img src={message.avatar} alt="Avatar"/>
                </div>
                <div className={styles["message-user-name"]}>
                    {message.user}
                </div>
            </div>
            <div className={styles["message-desc"]}>
                <div className={styles["message-time"]}>
                    {getDate(message.editedAt || message.createdAt)}
                </div>
                <div className={styles["message-text"]}>
                    {message.text}
                </div>
                <div
                    className={styles["message-like"]}
                    onClick={(event => onLike(event))}
                >
                    like
                </div>
            </div>
        </div>
    )
};

export default Message;