import React from "react";
import styles from "./MessageList.module.css";
import Message from "../message/Message";
import OwnMessage from "../ownMessage/OwnMessage";


const MessageList = ({messages, getDate, onLike, deleteMessage, editMessage}) => {
    const setDataToDivider = (time) => {
        const d = new Date(time)
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        return new Intl.DateTimeFormat('en-US', options).format(d);
    }
    const sortDate = (date) => {
        let d = new Date(date).toDateString();
        return new Date(d).getTime();
    };
    const arr = messages.map((m => sortDate(m.editedAt || m.createdAt)));
    const uniqeMessages = [...new Set(arr)].sort((a, b) => a - b);
    const sortedMessages = [];
    uniqeMessages.forEach((el, i) => {
        sortedMessages[i] = messages.filter(m => sortDate(m.editedAt || m.createdAt) === el);
    });
    return (
        <div className={styles["message-list"]}>
            {
                sortedMessages.map(el => {

                    return (
                        <React.Fragment key={el[0].id}>
                            <div className={styles["messages-divider"]}
                                 key={el[0].id}>{setDataToDivider(el[0].editedAt || el[0].createdAt)}</div>
                            {
                                el.map(message => {
                                    if (message.hasOwnProperty("myOwn"))
                                        return <OwnMessage getDate={getDate}
                                                           editMessage={() => editMessage(message.id)}
                                                           deleteMessage={() => deleteMessage(message.id)}
                                                           message={message}
                                                           key={message.id}/>;

                                    return <Message message={message}
                                                    key={message.id}
                                                    getDate={getDate}
                                                    onLike={onLike}/>;
                                })}
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
};

export default MessageList;