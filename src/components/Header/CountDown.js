import React, { Fragment, useState, useEffect } from "react";

//Stolen: https://programadorwebvalencia.com/Javascript-cuenta-atras-o-contador-regresivo/
function CountDown() {
  const MILLISECONDS_OF_A_SECOND = 1000;
  const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
  const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
  const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24;

  const [now, setNow] = useState(new Date());
  const [targetDate, setTargetDate] = useState(new Date(2022, 1, 12, 18));
  const [duration, setDuration] = useState(targetDate - now);
  const [remainingDays, setRemainingDays] = useState(
    Math.floor(duration / MILLISECONDS_OF_A_DAY)
  );
  const [remainingHours, setRemainingHours] = useState(
    Math.floor((duration % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR)
  );
  const [remainingMinutes, setRemainingMinutes] = useState(
    Math.floor((duration % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE)
  );
  const [remainingSeconds, setRemainingSeconds] = useState(
    Math.floor((duration % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND)
  );

  useEffect(() => {
    if (duration > 0) {
      setTimeout(() => {
        let rightNow = new Date();
        setNow(rightNow);
        setDuration(targetDate - rightNow);
        setRemainingDays(Math.floor(duration / MILLISECONDS_OF_A_DAY));
        setRemainingHours(
          Math.floor(
            (duration % MILLISECONDS_OF_A_DAY) / MILLISECONDS_OF_A_HOUR
          )
        );
        setRemainingMinutes(
          Math.floor(
            (duration % MILLISECONDS_OF_A_HOUR) / MILLISECONDS_OF_A_MINUTE
          )
        );
        setRemainingSeconds(
          Math.floor(
            (duration % MILLISECONDS_OF_A_MINUTE) / MILLISECONDS_OF_A_SECOND
          )
        );
      }, 1000);
    }
  });

  return (
    <Fragment>
      {duration > 0 ? (
        <h3>
          {remainingDays} {remainingDays === 1 ? "día" : "días"},{" "}
          {remainingHours} {remainingHours === 1 ? "hora" : "horas"},{" "}
          {remainingMinutes} {remainingMinutes === 1 ? "minuto" : "minutos"},{" "}
          {remainingSeconds} {remainingSeconds === 1 ? "segundo" : "segundos"}
        </h3>
      ) : (
        <h3>Time to party</h3>
      )}
    </Fragment>
  );
}

export default CountDown;
