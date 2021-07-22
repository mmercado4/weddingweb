import React from "react";
import PropTypes from "prop-types";

function Messages({ messages }) {
  let renderedMessages = messages.map((msg, i) => {
    return (
      <div className={`home-msg-slide slide-hide`} key={`msg${i}`}>
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
