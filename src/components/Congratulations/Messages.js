import React from "react";
import PropTypes from "prop-types";

function Messages({ messages }) {
  let slideWidth = (100 / messages.length).toString() + "%";

  let renderedMessages = messages.map((msg, i) => {
    return (
      <div
        className={`home-msg-slide slide${i + 1}`}
        style={{ width: slideWidth }}
        key={`msg${i}`}
      >
        <p className="home-msg-text">{msg.message}</p>
        <p className="home-msg-author">{msg.author}</p>
      </div>
    );
  });
  return renderedMessages;
}

Messages.propTypes = {
  messages: PropTypes.array,
};

export default Messages;
