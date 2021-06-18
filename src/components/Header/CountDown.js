import React, { Fragment, useState, useEffect } from "react";

function CountDown() {
  const [now, setNow] = useState(new Date());
  const [targetDate, setTargetDate] = useState(new Date(2022, 1, 12, 18));
  const [daysLeft, setDaysLeft] = useState(
    Math.floor((targetDate - now) / 1000 / 60 / 60 / 24)
  );
  const [hoursLeft, setHoursLeft] = useState(
    targetDate.getHours() - now.getHours()
  );
  const [minutesLeft, setMinutesLeft] = useState(60 - now.getMinutes());
  const [secondsLeft, setSecondsLeft] = useState(60 - now.getSeconds());

  //let targetDate = new Date(2022, 1, 12, 18); // 12/02/2022
  //let now = new Date();

  //let daysLeft = Math.floor((targetDate - now) / 1000 / 60 / 60 / 24);
  //   let hoursLeft = Math.floor(targetDate.getHours() - now.getHours() - 1);
  //   let minutesLeft = Math.floor(60 - now.getMinutes());
  //   let secondsLeft = Math.floor(60 - now.getSeconds());

  useEffect(() => {
    setTimeout(() => {
      let rightNow = new Date();
      setNow(rightNow);
      setDaysLeft(Math.round((targetDate - rightNow) / 1000 / 60 / 60 / 24));
      setHoursLeft(targetDate.getHours() - rightNow.getHours());
      setMinutesLeft(60 - rightNow.getMinutes());
      setSecondsLeft(60 - rightNow.getSeconds());
    }, 1000);
  });

  return (
    <Fragment>
      <p>{now.getSeconds()}</p>
      <h3>
        {daysLeft} días, {hoursLeft} horas, {minutesLeft} minutos, {secondsLeft}{" "}
        segundos
      </h3>
    </Fragment>
  );
}

export default CountDown;
