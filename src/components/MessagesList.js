import React from "react";

import Message from "./Message";
import classes from "./MessagesList.module.css";

const MessageList = (props) => {
  return (
    <ul className={classes["message-list"]}>
      {props.messages.map((message) => (
        <Message
          key={message.id}
          title={message.title}
          name={message.name}
          text={message.text}
        />
      ))}
    </ul>
  );
};

export default MessageList;
