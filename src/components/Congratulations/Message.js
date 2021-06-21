import React from "react";
import PropTypes from "prop-types";

function Message(props) {
  let { author, message } = props;
  return (
    <p>
      {author} - {message}
    </p>
  );
}

Message.propTypes = {
  author: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default Message;
