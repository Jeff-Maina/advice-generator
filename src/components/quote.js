import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function Quote({quotesTotal}) {
  let [quote, setQuote] = useState("");
  let [index, setIndex] = useState("");
  let [pending, setpending] = useState(true);
  let [copyState, setCopyState] = useState(false);
  let [likedQuotes, setLikedQuotes] = useState(quotesTotal);
  let [liked, setLiked] = useState(false);


  let copyIcon = copyState ? "done" : "content_copy";
  let copyColor = copyState ? "#03b4fa" : "#52ffa8";

  let total_quotes = quotesTotal


  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuote(data.slip.advice);
        setIndex(data.slip.id);
        setpending(false);
      });
  }, []);

  // reloading the page
  function reloadFxn() {
    window.location.reload();
  }

  // copying the quote
  function copyQuote() {
    if (!copyState) {
      setCopyState(true);
    } else {
      setCopyState(true);
    }

    let copyText = document.getElementById("paragraph");
    navigator.clipboard.writeText(copyText.textContent);
  }

  //   update number of liked quotes
  function updateLikes() {
    if (!liked) {

      total_quotes = 1;

      console.log(total_quotes);

      let today = new Date().toLocaleDateString()

      var todayDate = new Date();
      var time = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();

      let newObj = {
        quote,
        index,
        today,
        time
      };
      fetch("https://server-nine-navy.vercel.app/advices", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newObj),
      }).then((response) => {
        console.log(response);
      });
    }
  }


  return (
    <>
      <div id="liked-quotes">
        <NavLink to="liked">
          <h4>
            <i className="material-icons">favorite</i>
            <sup>{total_quotes}</sup>
          </h4>
        </NavLink>
      </div>
      <main>
        <h4>A D V I C E &nbsp;&nbsp;&nbsp; #{index}</h4>
        {pending && <h4 id="loading">loading ...</h4>}
        {pending || <p id="paragraph">{quote}</p>}
        <hr />
        <span id="options">
          <i onClick={updateLikes} className="material-symbols-outlined">
            favorite
          </i>
          <i
            onClick={copyQuote}
            style={{ color: copyColor }}
            className="material-symbols-outlined"
          >
            {copyIcon}
          </i>
        </span>
        <button
          onClick={() => {
            reloadFxn();
          }}
        >
          <i className="material-symbols-outlined">casino</i>
        </button>
      </main>
    </>
  );
}

export default Quote;
