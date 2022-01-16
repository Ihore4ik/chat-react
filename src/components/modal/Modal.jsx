import React, {useState} from "react";

import styles from "./Modal.module.css";
import {useSelector, useDispatch} from "react-redux";
import {closeModal} from "../../redux/chatSlice";
import {fetchUpdateMessage} from "../../redux/asyncFunc";


function Modal() {
    const {editModal,editedMessageId,authUser} = useSelector(state => state.chat);
    const {token} = authUser;
    const [text, setText] = useState("");
    const dispatch = useDispatch();
    const handleEditMessage = () => {
        dispatch(fetchUpdateMessage({token,editedMessageId,text}));
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