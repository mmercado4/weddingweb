import React, { Fragment, useState, useEffect, useRef } from "react";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import { HOST, APIPORT } from "../../tools/constants";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

function Congratulations() {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const slideShow = useRef(null);
  const interval = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []); //To avoid infity loop, set an empty array as second parameter.

  useEffect(() => {
    clearInterval(interval.current); //Clear interval to avoid several intervals at the same time.

    if (messages.length > 0) {
      interval.current = setInterval(() => {
        nextSlide();
      }, 5000);

      slideShow.current.addEventListener("mouseenter", () => {
        console.log("quitamos interval");
        clearInterval(interval.current);
      });

      slideShow.current.addEventListener("mouseleave", () => {
        console.log("ponemosinterval");
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

  //https://www.youtube.com/watch?v=q00ldTrywLU --> Slide - Carousel

  const nextSlide = () => {
    let list = slideShow.current.childNodes;
    let nextIndex;
    list.forEach((item, i) => {
      if (item.classList.contains("slide-active")) {
        item.classList.replace("slide-active", "slide-hide");
        let previousIndex = i;
        let maxCount = messages.length - 1;
        previousIndex === maxCount
          ? (nextIndex = 0)
          : (nextIndex = previousIndex + 1);
      }
    });
    list[nextIndex].classList.remove("slide-hide");
    list[nextIndex].classList.add("slide-active");
  };

  const previousSlide = () => {
    let list = slideShow.current.childNodes;
    let nextIndex;
    list.forEach((item, i) => {
      if (item.classList.contains("slide-active")) {
        item.classList.replace("slide-active", "slide-hide");
        let previousIndex = i;
        let maxCount = messages.length - 1;
        previousIndex === 0
          ? (nextIndex = maxCount)
          : (nextIndex = previousIndex - 1);
      }
    });
    list[nextIndex].classList.remove("slide-hide");
    list[nextIndex].classList.add("slide-active");
  };

  if (messages.length > 0) {
    return (
      <section className="congratulation">
        <div className="home-msg-section">
          <div ref={slideShow} className="home-msg-slider">
            <Messages messages={messages} />
          </div>
          <div className="arrow arrow-left" onClick={previousSlide}>
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="arrow arrow-right" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>

        <button className="msg-showform-btn btn" onClick={handleShowForm}>
          Déjanos tu mensaje
        </button>
        {showForm ? <MessageForm handleShowForm={handleShowForm} /> : null}
      </section>
    );
  } else {
    return (
      <section className="congratulation">
        <h2>Envíanos tus mensajes</h2>
      </section>
    );
  }
}

export default Congratulations;
