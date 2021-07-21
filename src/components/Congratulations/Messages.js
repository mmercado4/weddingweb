import React from "react";
import PropTypes from "prop-types";

function Messages({ messages }) {
  let renderedMessages = messages.map((msg, i) => {
    return (
      <div
        className={`home-msg-slide ${i === 0 ? "slide-active" : ""}`}
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
