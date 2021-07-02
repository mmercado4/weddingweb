import React from "react";
import PropTypes from "prop-types";

function Messages(props) {
  let { messages } = props;

  let renderedMessages = messages.map((msg, i) => {
    return (
      <p key={`msg${i}`}>
        {msg.author} - {msg.message}
      </p>
    );
  });

  return renderedMessages;
}

Messages.propTypes = {
  messages: PropTypes.array,
};

export default Messages;
