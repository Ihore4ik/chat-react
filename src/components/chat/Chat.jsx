import React, {useState, useEffect} from "react";
import Header from "../header/Header";
import MessageList from "../messageList/MessageList";
import Preloader from "../preloader/Preloader";
import MessageInput from "../messageInput/MessageInput";
import styles from "./Chat.module.css";
import {useDispatch, useSelector} from "react-redux";
import {createMessage, fetchMessages} from "../../redux/chatSlice";
// import preloader from "../preloader/Preloader";

const Chat = ({url}) => {
    const {preloader, error} = useSelector(state => state.chat);
    const dispatch = useDispatch();
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesCount = messages.length;
    const usersAll = [...new Set(messages.map(message => message.userId))].length;

    console.log(error)
    const onLike = (event) => {
        const likeEl = event.target.classList;
        likeEl.contains("active") ? likeEl.remove("active") : likeEl.add("active");
    };

    const handleCreateMessage = (event) => {
        event.preventDefault();
        dispatch(createMessage({inputValue}));
        // const  myMessage = {
        //       "id": Date.now(),
        //       "userId": "Me1990",
        //       "myOwn": true,
        //       "user": "Me",
        //       "text": inputValue,
        //       "createdAt": new Date().toISOString(),
        //       "editedAt": ""
        //   };
        //   const newMessages = [...messages];
        //   newMessages.push(myMessage);
        //   setMessages(newMessages);
        debugger
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
    const deleteMessage = (id) => {
        const newMessages = messages.filter(message => message.id !== id);
        setMessages(newMessages);

    };
    const editMessage = (id) => {
        const updatedMessage = messages.filter(message => message.id === id);
        setInputValue(updatedMessage[0].text);
    };

    useEffect(() => {
        dispatch(fetchMessages({url}))
    }, []);

    return (
        !preloader ? (
            <div className={styles.chat}>
                <Header messagesCount={messagesCount}
                        usersAll={usersAll}
                        lastMessage={lastMessage}/>
                <main className={styles.main}>
                    {error && <h2 className={styles.error}>An error occured: {error}</h2>}
                    <MessageList messages={messages}
                                 deleteMessage={deleteMessage}
                                 getDate={getDate}
                                 editMessage={editMessage}
                                 onLike={onLike}/>

                    <MessageInput value={inputValue}
                                  createMessage={handleCreateMessage}
                                  setInputValue={setInputValue}/>
                </main>

            </div>
        ) : <Preloader/>
    );

};

export default Chat;