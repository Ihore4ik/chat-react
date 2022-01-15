import React, {useState} from "react";

import styles from "./Modal.module.css";
import {useSelector, useDispatch} from "react-redux";
import {closeModal, editMessage} from "../../redux/chatSlice";


function Modal() {
    const {editModal,messages,editedMessageId} = useSelector(state => state.chat);
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const handleEditMessage = () => {
        const newM = messages.find(item=> item.id === editedMessageId);
        const clone = {};
        for (let key in newM) {
            clone[key] = newM[key];
        }
        console.log(clone,"clone")
        clone.editedAt = new Date().toISOString();
        clone.text = text;
        dispatch(editMessage(clone));
        dispatch(closeModal())
        setText("");
    }
    const handleCloseModal = () => {
        setText("");
        dispatch(closeModal())
    }
    return <>
        {
            editModal && <div className={styles["dit-message-modal"]}>
                <div className={styles["modal-shown"]}>
                <textarea
                    onChange={(event => setText(event.target.value))}
                    className={styles["edit-message-input"]}
                    value={text}/>
                    <div className={styles["edit-message-buttons"]}>
                        <button className={styles["edit-message-button"]}
                                onClick={handleEditMessage}
                        >Save</button>
                        <button className={styles["edit-message-close"]}
                                onClick={handleCloseModal }
                        >Close
                        </button>
                    </div>
                </div>
            </div>
        }
    </>


}

export default Modal;