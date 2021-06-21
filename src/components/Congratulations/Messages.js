import React from "react";
import PropTypes from "prop-types";
import Message from "./Message";

function Messages(props) {
  let { messages } = props;
  return messages.map((message, index) => (
    <Message
      author={message.author}
      message={message.message}
      key={`msg${index}}`}
    />
  ));
}

Messages.propTypes = {
  messages: PropTypes.array,
};

export default Messages;
