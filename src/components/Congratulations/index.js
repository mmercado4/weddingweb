import React, { Fragment, useState, useEffect } from "react";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import { HOST, APIPORT } from "../../tools/constants";

function Congratulations() {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const getSliderWidth = () => {
    if (messages.length > 0) {
      return (messages.length * 100).toString() + "%";
    }
    return "100%";
  };

  let sliderWidth = getSliderWidth();

  if (messages.length > 0) {
    return (
      <section className="congratulation">
        <div className="home-msg-section">
          <div className="home-msg-slider" style={{ width: sliderWidth }}>
            <Messages messages={messages} />
          </div>
        </div>
        <button className="msg-showform-btn" onClick={handleShowForm}>
          Déjanos tu mensaje
        </button>
        {showForm ? <MessageForm fetchMessages={fetchMessages} /> : null}
      </section>
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
