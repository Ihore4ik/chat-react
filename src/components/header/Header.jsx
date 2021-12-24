import React from "react";
import styles from "./Header.module.css";

const Header = ({usersAll, messagesCount, lastMessage}) => {
    return (
        <header className={styles.header}>
            <div className={styles["header-left"]}>
                <div className={styles["header-title"]}>
                    React chat app
                </div>
                <div className={styles["header-users-count"]}>
                    {`${usersAll} participants`}
                </div>
                <div className={styles["header-messages-count"]}>
                    {`${messagesCount} messages`}
                </div>
            </div>
            <div className={styles["header-right"]}>
                <div className={styles["header-last-message-date"]}>
                    Last message at <span>{lastMessage}</span>
                </div>
            </div>
        </header>
    )
};

export default Header;