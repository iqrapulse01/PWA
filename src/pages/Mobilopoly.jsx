import React from "react";
import "../styles/Mobilopoly.css";
const Mobilopoly = () => {


  const visitLink = ()=> {
    window.location.href = 'https://shopchibiz.com/';
  }
  return (
    <div className="mobilopoly">
      <h1>Mobilopoly</h1>
      <p>Experience Mobilopoly, where each swipe opens a dynamic world of exclusive offers and surprise deals. Engage on the go, tackle fun challenges, and score amazing rewards right from your mobile device.</p>
      <button className="claim-deal-button" onClick={visitLink}>
        Visit 
      </button>
    </div>
  );
};

export default Mobilopoly;