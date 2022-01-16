import React from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from "./AddNewUser.module.css";
import {fetchAddUser} from "../../redux/fetchUsers";
import {closeModal} from "../../redux/chatSlice";

const AddNewUser = () => {
    const {token} = useSelector(state => state.chat.authUser);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const user = {};
        for (let entry of formData.entries()) {
            user[entry[0]] = entry[1]
        }
        const {name, email, password, avatar} = user;

        dispatch(fetchAddUser({token, name, email, password, avatar}));
        dispatch(closeModal());
    }
    const handleCloseModal = (event) => {
        event.preventDefault();
        dispatch(closeModal());
    }
    return (
        <form
            onSubmit={(event) => handleSubmit(event)}
            className={styles.form}
        >
          <span className={styles.inputs}>
             <input type="text" placeholder="Name" name="name"/>
            <input type="text" placeholder="Email" name="email"/>
            <input type="text" placeholder="Password" name="password"/>
            <input type="text" placeholder="Avatar" name="avatar"/>
          </span>
            <span className={styles.buttons}>
                <button onClick={(event) => handleCloseModal(event)}>&#10006;</button>
            <button>Add</button>
            </span>
        </form>
    );
}

export default AddNewUser;