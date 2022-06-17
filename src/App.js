import React, { useState } from "react";

import MessagesList from "./components/MessagesList";
import AddMessage from "./components/AddMessage";
import "./App.css";
function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchMessageHandler() {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        "https://reactt-apii-default-rtdb.firebaseio.com/message.json"
      );

      if (!response.ok) {
        throw new Error("Something went Wrong !");
      }

      const data = await response.json();

      const loadedMessages = [];

      for (const key in data) {
        loadedMessages.push({
          id: key,
          title: data[key].title,
          text: data[key].text,
          name: data[key].name,
        });
      }

      setMessages(loadedMessages.reverse());
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }

  async function addMessageHandler(message) {
    const response = await fetch(
      "https://reactt-apii-default-rtdb.firebaseio.com/message.json",
      {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  let content = <p>No Messages</p>;

  if (messages.length > 0) {
    content = <MessagesList messages={messages} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (loading) {
    content = <p>loading ...</p>;
  }
  return (
    <React.Fragment>
      <section>
        <AddMessage
          onAddMessage={addMessageHandler}
          fetch={fetchMessageHandler}
        />
      </section>
      <section>
        <button onClick={fetchMessageHandler}>Fetch Messages</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
