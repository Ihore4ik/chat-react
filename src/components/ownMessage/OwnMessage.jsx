import React from "react";
import styles from "./OwnMessage.module.css"
import { addMessageId, openModal} from "../../redux/chatSlice";
import {useDispatch} from "react-redux";
import {fetchDeleteMessage} from "../../redux/asyncFunc";

const OwnMessage = ({message, getDate,token}) => {
    const {id} = message;
    const setId = (id)=>{
        dispatch(addMessageId(id));
        dispatch(openModal());
    }
    const dispatch = useDispatch();
    return (
        <div className={styles["own-message"]}>
            <div className={styles["own-message_events"]}>
                <button className={styles["message-edit"]}
                   onClick={()=>setId(message.id)}
                >Edit</button>
                <button
                    className={styles["message-delete"]}
                    onClick={()=>dispatch(fetchDeleteMessage({token,id}))}
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