import React, { Fragment, useState, useEffect } from "react";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import { HOST, APIPORT } from "../../tools/consts";

function Congratulations() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let allMessagesUrl = "/api/messages";
    fetch(`${HOST}${APIPORT}${allMessagesUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error(error));
  }, []); //To avoid infity loop, set an empty array as second parameter.

  if (messages.length > 0) {
    return (
      <Fragment>
        <Messages messages={messages} />
        <MessageForm />
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
