import React, { useRef } from "react";

import classes from "./AddMessage.module.css";

function AddMessage(props) {
  const titleRef = useRef("");
  const textRef = useRef("");
  const nameRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();
    if (
      titleRef.current.value &&
      textRef.current.value &&
      nameRef.current.value
    ) {
      const message = {
        title: titleRef.current.value,
        text: textRef.current.value,
        name: nameRef.current.value,
      };
      props.onAddMessage(message);
      setTimeout(() => {
        props.fetch();
      }, 1000);
    } else {
      alert("Fill in all entries");
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="text">Text</label>
        <textarea rows="5" id="text" ref={textRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
      </div>
      <button>Send</button>
    </form>
  );
}

export default AddMessage;
