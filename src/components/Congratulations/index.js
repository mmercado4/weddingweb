import React, { Fragment, useState, useEffect, useRef } from "react";
import Messages from "./Messages";
import MessageForm from "./MessageForm";
import { HOST, APIPORT } from "../../tools/constants";
import "../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css";

function Congratulations() {
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [index, setIndex] = useState(1);

  const slideShow = useRef(null);
  const interval = useRef(null);

  let count = 0; //Cuando se envía mensaje se pone esto a 0 y puede darse que haya dos activados.

  useEffect(() => {
    fetchMessages();
  }, []); //To avoid infity loop, set an empty array as second parameter.

  useEffect(() => {
    if (messages.length > 0) {
      //slideShow.current.children.classList.remove("slide-active"); //LO MISMO PODEMOS HACER ALGO ASÍ??

      interval.current = setInterval(() => {
        console.log("ponemos interval");
        setIndex((index) => index + 1);
        console.log(index);
        //nextSlide();
      }, 4000);

      slideShow.current.addEventListener("mouseenter", () => {
        console.log("quitamos interval");
        clearInterval(interval.current);
      });

      slideShow.current.addEventListener("mouseleave", () => {
        console.log("ponemosinterval");
        interval.current = setInterval(() => {
          nextSlide();
        }, 4000);
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
    console.log(index);
    let newIndex = messages.length - 1 === index ? 0 : index + 1;
    console.log(newIndex);
    setIndex(newIndex);
    // let maxCount = messages.length - 1;
    // slideShow.current.children[count].classList.remove("slide-active");
    // slideShow.current.children[count].classList.add("slide-hide");
    // if (count === maxCount) count = 0;
    // else count++;
    // slideShow.current.children[count].classList.remove("slide-hide");
    // slideShow.current.children[count].classList.add("slide-active");
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
          <div className="arrow arrow-left" onClick={previousSlide}>
            <i className="fas fa-chevron-left"></i>
          </div>
          <div className="arrow arrow-right" onClick={nextSlide}>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>

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
