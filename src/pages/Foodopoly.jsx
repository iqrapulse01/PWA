import React from 'react'

const Foodopoly = () => {
    const visitLink = ()=> {
        window.location.href = 'https://www.UrbanEats.directory';
      }
      return (
        <div className="mobilopoly">
          <h1>Foodopoly</h1>
          <p>Experience Foodopoly, where every meal transforms into an exciting culinary adventure filled with exclusive rewards. Engage in fun challenges, collect tokens, and unlock mouthwatering deals at your favorite local restaurants.</p>
          <button className="claim-deal-button" onClick={visitLink}>
            Visit 
          </button>
        </div>
      );
}

export default Foodopoly