import React, {useEffect} from "react";
import styles from "./Users.module.css";
import {useSelector,useDispatch} from "react-redux";
import User from "./User";
import { fetchUsers} from "../../redux/fetchUsers";
import Modal from "../modal/Modal";
import AddNewUser from "./AddNewUser";
import {openModal} from "../../redux/chatSlice";

const Users = () => {
    const {users,authUser} = useSelector(state=>state.chat);
    const {token} = authUser;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUsers({token}));

    }, []);
    return (
        <div className={styles.users}>
            <div className={styles["wrapper-btn"]}>
                <button className={styles["btn-add"]}
                onClick={()=>dispatch(openModal())}
                >Add user</button>
            </div>
            <ul className={styles["users-content"]}>
                {
                    users && users.map(user=>{
                       return <User token={token} user={user} key={user.id}/>
                    })
                }
            </ul>
            <Modal children={<AddNewUser/>}/>
        </div>
    )
}

export default Users;