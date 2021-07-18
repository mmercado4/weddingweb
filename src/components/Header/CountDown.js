import React, { useState, useEffect } from "react";

//Stolen: https://programadorwebvalencia.com/Javascript-cuenta-atras-o-contador-regresivo/
function CountDown() {
  const MILLISECONDS_OF_A_SECOND = 1000;
  const MILLISECONDS_OF_A_MINUTE = MILLISECONDS_OF_A_SECOND * 60;
  const MILLISECONDS_OF_A_HOUR = MILLISECONDS_OF_A_MINUTE * 60;
  const MILLISECONDS_OF_A_DAY = MILLISECONDS_OF_A_HOUR * 24;

  const [now, setNow] = useState(new Date());
  const [targetDate, setTargetDate] = useState(new Date(2022, 1, 26, 12));
  //const [targetDate, setTargetDate] = useState(new Date(2021, 6, 18, 18)); //TEST
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

  if (duration > 0) {
    return (
      <section className="countdown-section">
        <div className="countdown-field">
          <p className="countdown-time">{remainingDays}</p>
          <p className="countdown-units">
            {remainingDays === 1 ? "día" : "días"}
          </p>
        </div>

        <div className="countdown-field">
          <p className="countdown-time">{remainingHours}</p>
          <p className="countdown-units">
            {remainingHours === 1 ? "hora" : "horas"}
          </p>
        </div>

        <div className="countdown-field">
          <p className="countdown-time">{remainingMinutes}</p>
          <p className="countdown-units">
            {remainingMinutes === 1 ? "minuto" : "minutos"}
          </p>
        </div>

        <div className="countdown-field">
          <p className="countdown-time">{remainingSeconds}</p>
          <p className="countdown-units">
            {remainingSeconds === 1 ? "segundo" : "segundos"}
          </p>
        </div>
      </section>
    );
  } else {
    return (
      <section className="countdown-section">
        <h2>Just Married!</h2>
      </section>
    );
  }
}

export default CountDown;
