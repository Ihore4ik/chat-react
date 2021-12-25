import React from "react";
import styles from "./MessageInput.module.css"

const MessageInput = ({value, setInputValue, createMessage}) => {
    return (
        <form onSubmit={(event) => createMessage(event)}
              className={styles["message-input"]}>
            <input
                className={styles["message-input-text"]}
                value={value}
                onChange={(event => setInputValue(event.target.value))}
                type="text"/>
            <input className={styles["message-input-button"]} type="submit"
                   value="Send"/>
        </form>
    )
};

export default MessageInput;