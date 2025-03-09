import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SplashScreenn.css";
import { Link } from "react-router-dom";
import partnersImage from "../assets/images/young-man.jpg"; // Placeholder Image
import SplashScreen from "./SplashScreen";


const PartnersSplash = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      let splashScreen = document.querySelector(".splash-screen_dealopoly");
      let navButtons = document.querySelector("#nav-buttons-partners");
      if (splashScreen) {
        splashScreen.style.display = "none";
        navButtons.style.display = "flex";
      }
      clearInterval(timer); // Stop countdown when splash disappears
    }, 5000);
    return () => clearInterval(timer);
  }, [navigate]);

  const [showSplashScreen, setShowSplashScreen] = useState(true)


  useEffect(() => {
      const timer = setTimeout(() => {
        setShowSplashScreen(false);
      }, 5000); // Show splash for 3 sec
      return () => clearTimeout(timer);
    }, []);
    
  
    if(showSplashScreen){
      return <SplashScreen partners={true}/>
    }
  

  return (

    <>
   

      <div id="nav-buttons-partners">
          <button onClick={() => navigate("/foodopoly")}>Foodopoly</button>
          <button onClick={() => navigate("/mobilopoly")}>Mobilopoly </button>
          {/* <button onClick={() => handleNavigation("/about")}>About Us</button> */}
        </div>

    </>
  );
};


export default PartnersSplash;
