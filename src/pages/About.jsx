import React, { useEffect, useState } from "react";
import "../styles/About.css";

const About = () => {
  const [step, setStep] = useState(0); // 0 = initial, 1 = flipped, 2 = sprinkle

useEffect(() => {
  const flipTimeout = setTimeout(() => {
    setStep(1); // Flip after 1 second
  }, 1000);

  const sprinkleTimeout = setTimeout(() => {
    setStep(2); // Start sprinkles after flip is complete
    setTimeout(() => setStep(3), 1000); // Stop sprinkles after 1 second
  }, 2000); // Adjust timing to match flip duration

  return () => {
    clearTimeout(flipTimeout);
    clearTimeout(sprinkleTimeout);
  };
}, []);


  return (
    <div className="about-container">
      <div className={`about-content ${step >= 1 ? "flip" : ""}`}>
        <h1 className="large rise">Welcome to Deal Grabber!</h1>
        <h2 className="large rise">
          Your Digital Passport for Amazing Deals and Discounts from local Businesses
        </h2>
       
        <p>
        As a proud channel Partner of{" "}
          <span className="highlight">Localopoly, Local Directories, Deal Grabber unites restaurants retail</span> and{" "}
          <span className="highlight">service businesses with cost conscious consumers</span>ike you who are eager to discover unbeatable Deals and discounts at local destinations.
        </p>
        <p>
        Whether you are a savvy shopper seeking to stretch your dollars or a local business looking for ways to attract new customers, Our <strong style={{ color: "#148446", textTransform: "uppercase" }}>Ai gamified platform</strong>  is the ultimate answer.
        </p>
      </div>

      {/* Sprinkle Effect */}
      <div className={`sprinkles ${step === 2 ? "active" : ""}`}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="sprinkle-dot"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`, // Random delay for sprinkles
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default About;