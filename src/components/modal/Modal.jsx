import React from "react";

import styles from "./Modal.module.css";
import {useSelector} from "react-redux";


function Modal({children}) {
    const {editModal} = useSelector(state => state.chat);
    return <>
        {
            editModal && <div className={styles["dit-message-modal"]}>
                <div className={styles["modal-shown"]}>
                    {children}
                </div>
            </div>
        }
    </>
}

export default Modal;