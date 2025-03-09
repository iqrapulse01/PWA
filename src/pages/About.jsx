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
        <h1 className="large rise">Welcome to Deal Grabber</h1>
        <h2 className="large rise">
          Your Ultimate Digital Passport for Amazing Deals and Discounts!
        </h2>
        <p>
          Deal Grabber unites restaurant, retail, and service businesses with
          cost-conscious consumers like you who are eager to discover unbeatable
          deals and discounts at hundreds of local destinations.
        </p>
        <p>
          As a proud channel partner of the{" "}
          <span className="highlight">ShopChiBiz Directory</span> and{" "}
          <span className="highlight">Urban Eats Restaurant Directory</span>, we
          empower you to save big while supporting your favorite local
          establishments.
        </p>
        <p>
          Whether you're a business looking to attract more customers or a savvy
          shopper hunting for exclusive bargains, Deal Grabber delivers
          incredible <strong>AI-enabled offers</strong> right at your
          fingertips.
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