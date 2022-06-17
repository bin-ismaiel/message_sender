import React from "react";

import classes from "./Message.module.css";

const Message = (props) => {
  return (
    <li className={classes.message}>
      <h2>{props.title}</h2>
      <h3>{`By ${props.name}`}</h3>
      <p>{props.text}</p>
    </li>
  );
};

export default Message;
