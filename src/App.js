import React, { useState } from "react";
import axios from "axios";
import AddMessage from "./components/AddMessage";
import MessagesList from "./components/MessagesList";
import "./App.css";
function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchMessageHandler() {
    setError(null);
    setLoading(true);
    try {
      const response = await axios(
        "https://reactt-apii-default-rtdb.firebaseio.com/message.json",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = response.data;

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
      console.log(Error(error.code));
      setError(`Something went wrong !`);
    }
    setLoading(false);
  }

  async function addMessageHandler({ title, text, name }) {
    try {
      const response = await axios.post(
        "https://reactt-apii-default-rtdb.firebaseio.com/message.json",
        {
          title: title,
          text: text,
          name: name,
        }
      );
    } catch (error) {
      console.log(error.code);
    }
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
