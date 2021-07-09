import React, { Fragment, useState, useEffect } from "react";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import { HOST, APIPORT } from "../../tools/constants";

function Congratulations() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []); //To avoid infity loop, set an empty array as second parameter.

  const fetchMessages = () => {
    let allMessagesUrl = "/api/messages";
    fetch(`${HOST}${APIPORT}${allMessagesUrl}`)
      .then((response) => response.json())
      .then((data) => {
        let randomSortedData = data.sort((a, b) => {
          let randomA = Math.random();
          let randomB = Math.random();
          if (randomA >= randomB) return 1;
          else return -1;
        });
        setMessages(randomSortedData);
      })
      .catch((error) => console.error(error));
  };

  if (messages.length > 0) {
    return (
      <Fragment>
        <Messages messages={messages} />
        <MessageForm fetchMessages={fetchMessages} />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h2>Congratulations</h2>
      </Fragment>
    );
  }
}

export default Congratulations;
