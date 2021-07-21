import React, { Fragment, useState, useEffect, useRef } from "react";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import { HOST, APIPORT } from "../../tools/constants";

function Congratulations() {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const slideShow = useRef(null);
  const interval = useRef(null);

  let count = 0;

  useEffect(() => {
    fetchMessages();
  }, []); //To avoid infity loop, set an empty array as second parameter.

  useEffect(() => {
    if (messages.length > 0) {
      interval.current = setInterval(() => {
        nextSlide();
      }, 5000);

      slideShow.current.addEventListener("mouseenter", () => {
        clearInterval(interval.current);
      });

      slideShow.current.addEventListener("mouseleave", () => {
        interval.current = setInterval(() => {
          nextSlide();
        }, 5000);
      });
    }
  }, [messages]);

  const fetchMessages = () => {
    let allMessagesUrl = "/api/messages";
    fetch(`${HOST}${APIPORT}${allMessagesUrl}`)
      .then((response) => response.json())
      .then((data) => {
        let randomSortedData = data.sort((a, b) => {
          let randomA = Math.random();
          let randomB = Math.random();
          if (randomA >= randomB) return 1;
          else return -1;
        });
        setMessages(randomSortedData);
      })
      .catch((error) => console.error(error));
  };

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  //https://www.youtube.com/watch?v=q00ldTrywLU --> Slide

  const nextSlide = () => {
    let maxCount = messages.length - 1;
    slideShow.current.children[count].classList.remove("slide-active");
    slideShow.current.children[count].classList.add("slide-hide");

    if (count === maxCount) count = 0;
    else count++;

    slideShow.current.children[count].classList.remove("slide-hide");
    slideShow.current.children[count].classList.add("slide-active");
  };

  const previousSlide = () => {
    let maxCount = messages.length - 1;
    slideShow.current.children[count].classList.remove("slide-active");
    slideShow.current.children[count].classList.add("slide-hide");

    if (count === 0) count = maxCount;
    else count--;

    slideShow.current.children[count].classList.remove("slide-hide");
    slideShow.current.children[count].classList.add("slide-active");
  };

  if (messages.length > 0) {
    return (
      <section className="congratulation">
        <div className="home-msg-section">
          <div ref={slideShow} className="home-msg-slider">
            <Messages messages={messages} />
          </div>
        </div>
        <button onClick={previousSlide}>Anterior</button>
        <button onClick={nextSlide}>Siguiente</button>
        <button className="msg-showform-btn" onClick={handleShowForm}>
          Déjanos tu mensaje
        </button>
        {showForm ? <MessageForm fetchMessages={fetchMessages} /> : null}
      </section>
    );
  } else {
    return (
      <Fragment>
        <h2>Congratulations</h2>
      </Fragment>
    );
  }
}

export default Congratulations;
