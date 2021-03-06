import React, {useState, useEffect} from "react";
import Header from "../header/Header";
import MessageList from "../messageList/MessageList";
import Preloader from "../preloader/Preloader";
import MessageInput from "../messageInput/MessageInput";
import styles from "./Chat.module.css";
import {useDispatch, useSelector} from "react-redux";
import { fetchMessages, fetchOwnMessage} from "../../redux/fetchMessages";
import Modal from "../modal/Modal";
import ChildrenModal from "../modal/ChildrenModal";

const Chat = ({url}) => {
    const {preloader, messages, authUser} = useSelector(state => state.chat);
    const {token} = authUser;
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const messagesCount = messages.length;
    const usersAll = [...new Set(messages.map(message => message.userId))].length;

    const onLike = (event) => {
        const likeEl = event.target.classList;
        likeEl.contains("active") ? likeEl.remove("active") : likeEl.add("active");
    };

    const handleCreateMessage = (event) => {
        event.preventDefault();
        if (inputValue.trim()) {
            dispatch(fetchOwnMessage({token,inputValue}));
        }
        setInputValue('');
    };
    const getDate = (time) => {
        const date = new Date(time);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}  ${date.getHours()}.${date.getMinutes()}:${date.getSeconds()}`
    };
    const getLastMessage = (arrOfMessages) => {
        const arr = [];
        arrOfMessages.forEach(message => {
            arr.push(message.editedAt || message.createdAt)
        });
        return Math.max(...arr.map(date => new Date(date).getTime()));
    };
    const lastMessage = getDate(getLastMessage(messages));


    useEffect(() => {
        dispatch(fetchMessages({url, token}));

    }, []);

    return (
            !preloader ? (
                <div className={styles.chat}>
                    <Header messagesCount={messagesCount}
                            usersAll={usersAll}
                            lastMessage={lastMessage}/>
                    <main className={styles.main}>
                        <MessageList getDate={getDate}
                                     onLike={onLike}/>
                        <MessageInput value={inputValue}
                                      createMessage={handleCreateMessage}
                                      setInputValue={setInputValue}/>
                    </main>
                    <Modal children={<ChildrenModal/>}/>
                </div>
            ) : <Preloader/>
    );

};

export default Chat;