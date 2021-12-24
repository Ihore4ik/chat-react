import React from "react";
import styles from "./MessageList.module.css";
import Message from "../message/Message";
import OwnMessage from "../ownMessage/OwnMessage";

const MessageList = ({messages,getDate}) => {
    return (
    <div className={styles["message-list"]}>
        {
            messages.map(message=>{
                {/*<OwnMessage getDate={getDate} myMessage={myMessage}/>*/}
                if(message.hasOwnProperty("myOwn")){
                    return <OwnMessage getDate={getDate} message={message} key={message.id}/>
                }
              return  <Message message={message} key={message.id} getDate={getDate}/>;
            })
        }
    </div>
    )
};

export default MessageList;