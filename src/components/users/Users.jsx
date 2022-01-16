import React, {useEffect} from "react";
import styles from "./Users.module.css";
import {useSelector,useDispatch} from "react-redux";
import User from "./User";
import { fetchUsers} from "../../redux/chatSlice";

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
                <button className={styles["btn-add"]}>Add user</button>
            </div>
            <ul className={styles["users-content"]}>
                {
                    users && users.map(user=>{
                       return <User user={user} key={user.id}/>
                    })
                }
            </ul>
        </div>
    )
}

export default Users;