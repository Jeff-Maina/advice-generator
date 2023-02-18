import { useEffect, useState } from "react";
import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";

function Liked() {
  let [quoteList, setQuoteList] = useState([]);

  useEffect(() => {
    fetch("https://server-nine-navy.vercel.app/advices")
      .then((res) => res.json())
      .then((data) => {
        setQuoteList(data);
      });
  }, []);

  let quotes = quoteList.map((quote, index) => {
    return (
      <div key={index} id="likedQuote">
        <i
          onClick={(e) => {
            deleteQuote(e, quote.id);
          }}
          id="cancel-icon"
          className="material-symbols-outlined"
        >
          close
        </i>
        <p id="liked-par">{quote.quote}</p>
        <div id="quote-details">
          <span>
            <h5>Date added :</h5>
            <h5 id="date">{quote.today}</h5>
            <span>
              <h5>Time added :</h5>
              <h5 id="date">{quote.time}</h5>
            </span>
          </span>
        </div>
      </div>
    );
  });

  function deleteQuote(event, num) {
    event.target.parentNode.remove();
    console.log("deleted");
    fetch(`https://server-nine-navy.vercel.app/advices/${num}`, {
      method: "DELETE",
    }).then(console.log("deletItem"));
  }

  console.log(quoteList);

  return (
    <section>
      <NavLink event to= "/">
        <i id="back-icon" className="material-icons">
          arrow_backward
        </i>
      </NavLink>
      {quotes}
    </section>
  );
}

export default Liked;
