import React from "react";
import styles from "./MessageInput.module.css"
// import {useDispatch} from "react-redux";

const MessageInput = ({value, setInputValue, handleCreateMessage}) => {

    return (
        <form onSubmit={(event) => handleCreateMessage(event)}
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