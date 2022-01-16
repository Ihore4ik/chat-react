import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {fetchUpdateMessage} from "../../redux/fetchMessages";
import {closeModal} from "../../redux/chatSlice";
import styles from "./Modal.module.css";


const ChildrenModal = () => {
    const {editedMessageId, authUser} = useSelector(state => state.chat);
    const {token} = authUser;
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const handleEditMessage = () => {
        dispatch(fetchUpdateMessage({token, editedMessageId, text}));
        dispatch(closeModal())
        setText("");
    }
    const handleCloseModal = () => {
        setText("");
        dispatch(closeModal())
    }

    return (
        <>
            <textarea
                          onChange={(event => setText(event.target.value))}
                          className={styles["edit-message-input"]}
                          value={text}/>
            <div className={styles["edit-message-buttons"]}>
                <button className={styles["edit-message-button"]}
                        onClick={handleEditMessage}
                >Save
                </button>
                <button className={styles["edit-message-close"]}
                        onClick={handleCloseModal}
                >Close
                </button>
            </div>
        </>
    )
}
export default ChildrenModal;

