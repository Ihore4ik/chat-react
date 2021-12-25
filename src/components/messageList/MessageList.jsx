import React from "react";
import styles from "./MessageList.module.css";
import Message from "../message/Message";
import OwnMessage from "../ownMessage/OwnMessage";



const MessageList = ({messages,getDate,onLike,deleteMessage}) => {
    return (
    <div className={styles["message-list"]}>
        {
            messages.map(message=>{
                if(message.hasOwnProperty("myOwn")){
                    return <OwnMessage getDate={getDate}
                                       deleteMessage={()=>deleteMessage(message.id)}
                                       message={message}
                                       key={message.id}/>
                }
              return  <Message message={message} key={message.id} getDate={getDate} onLike={onLike}/>;
            })
        }
    </div>
    )
};

export default MessageList;