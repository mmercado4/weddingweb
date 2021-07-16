import React, { Fragment, useState, useEffect } from "react";
import { HOST, APIPORT } from "../../tools/constants";

export default function Resume() {
  const [messages, setMessages] = useState([]);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    fetchMessages();
    fetchGuests();
  }, []);

  const fetchMessages = () => {
    let urlMessages = "/api/messages";
    fetch(`${HOST}${APIPORT}${urlMessages}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      });
  };

  const fetchGuests = () => {
    let urlMessages = "/api/guests";
    fetch(`${HOST}${APIPORT}${urlMessages}`)
      .then((response) => response.json())
      .then((data) => {
        setGuests(data);
      });
  };

  let countMessages = messages.length;
  let countGuests = guests.length;
  let countBus = guests
    .map((guest) => guest.bus)
    .reduce((acc, next) => {
      return next ? acc + next : acc;
    }, 0);

  return (
    <Fragment>
      <h3>Resumen</h3>
      <p>{countMessages} mensajes</p>
      <p>{countGuests} invitados confirmados</p>
      <p>{countBus} invitados con autobús</p>
    </Fragment>
  );
}
