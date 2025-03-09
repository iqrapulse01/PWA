import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Home.css";
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import spinPlaceholder from "../assets/images/1994_spincircle.png";
import { auth } from "../utils/firebaseConfig";
import toast from "react-hot-toast";
import SpinWheel from "../components/SpinWheel";
import logo from "../assets/images/logo.png";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  const prizes = [
    "No Prize",
    "Your Prize 1",
    "Your Prize 2",
    "Your Prize 3",
    "Your Prize 4",
    "Your Prize 5",
  ];
  const [showPopup, setShowPopup] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showSplash, setShowSplash] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);
  const navigate = useNavigate();
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      console.log("✅ beforeinstallprompt event fired!");
      setDeferredPrompt(event);
    };
  
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    console.log("📢 Event listener added for beforeinstallprompt");
  
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);
  

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleClosePopup = () => setShowPopup(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("submitting...");
    try {
      await addDoc(collection(db, "users"), {
        name,
        phone,
      });
      toast.success("successfully submitted! 🎉", { id: toastId });
      setName("");
      setPhone("");
      setShowPopup(false);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("something went wrong...", { id: toastId });
    }
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const name = user.email.split("@")[0];
      setUsername(name);
    }
  }, []);

  const handleNavigation = (path) => {
    setShowSplash(true);
    setRedirectPath(path);
    setTimeout(() => {
      setShowSplash(false);
      if (path.startsWith("http")) {
        window.location.href = path;
      } else {
        navigate(path);
      }
    }, 5000);
  };

  useEffect(() => {
    setShowPopup(true);
  }, []);

  return (
    <div className="home-container">
      {showSplash && (
        <div className="splash-screen">
          <h2>Loading...</h2>
          <p>Get ready for exclusive deals and rewards!</p>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <div className="brand-logo" style={{ backgroundImage: `url(${logo})` }}></div>
            <h2 className="brand-title ">Enter Details to Play</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="tel" placeholder="Enter your phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="popup-buttons">
                <button type="submit" className="submit-bt">Submit</button>
                <button className="close-btn" type="reset" onClick={handleClosePopup}>Skip</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="home-content">
        <h1 className="large rise ">Welcome {username ? username : ""} to Deal Grabber</h1>
        <p>Spin to win amazing Deals & Discounts from Dealopoly.</p>
        <p>Dealopoly is your super search engine for local offers in your area.</p>

        <div className="spin-game">
          <SpinWheel prizes={prizes} />
        </div>

        <button className="download-btn" onClick={handleInstallClick}>
          <FiDownload size={20} /> Install App
        </button>

        <div id="nav-buttons">
          <button onClick={() => navigate("/dealopoly")}>Dealopoly</button>
          <button onClick={() => navigate("/localopoly")}>Deal Pages</button>
          <button onClick={() => navigate("/partners")}>Partners</button>
          <button onClick={() => navigate("/about")}>About</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
