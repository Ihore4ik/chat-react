import React, {useState, useEffect} from "react";
import Header from "../header/Header";
import MessageList from "../messageList/MessageList";
import Preloader from "../preloader/Preloader";
import styles from "./Chat.module.css";
import MessageInput from "../messageInput/MessageInput";

const Chat = ({url}) => {
    const [messages, setMessages] = useState([]);
    const [myMessage, setMyMessages] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const messagesCount = messages.length;
    const usersAll = [...new Set(messages.map(message => message.userId))].length;
    const [isLoaded, setIsLoaded] = useState(false);


    const createMessage = (event) => {
        event.preventDefault();
        const myMessage = {
            "id": Date.now(),
            "userId": "Me1990",
            "myOwn": true,
            "user": "Me",
            "text": inputValue,
            "createdAt": new Date().toISOString(),
            "editedAt": ""
        }
        messages.push(myMessage);
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
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setMessages(data)
                setIsLoaded(true);
            });
    }, []);

    return (
        isLoaded ? (
            <div className={styles.chat}>
                <Header messagesCount={messagesCount}
                        usersAll={usersAll}
                        lastMessage={lastMessage}/>
                <main className={styles.main}>
                    <MessageList messages={messages} getDate={getDate}/>

                    <MessageInput value={inputValue}
                                  createMessage={createMessage}
                                  setInputValue={setInputValue}/>
                </main>
            </div>
        ) : <Preloader/>
    );

};

export default Chat;