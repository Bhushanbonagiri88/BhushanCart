import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import { useNavigate } from "react-router-dom";

// Make sure Bootstrap Icons are imported in index.js or App.js
// import "bootstrap-icons/font/bootstrap-icons.css";

export default function VoiceAssistant({
  products,
  triggerToast,
  continuous = false,
  userName = "Guest",
}) {
  const [listening, setListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const recognitionRef = useRef(null);
  const intentionallyStoppedRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUsername } = useSelector((state) => state.registerUser);

  const speakMessage = (msg) => {
    if (!speechEnabled || !msg) return;
    const utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = "en-IN";
    window.speechSynthesis.speak(utterance);
  };

  const showMessage = (msg) => {
    if (typeof triggerToast === "function") triggerToast(msg);
    else alert(msg);
    speakMessage(msg);
  };

  // --- Welcome message only once when user enters ---
  useEffect(() => {
    const welcomeShown = sessionStorage.getItem("welcomeShown");
    if (!welcomeShown) {
      const welcomeMsg = `Welcome ${currentUsername || userName}, how can I help you today?`;
      speakMessage(welcomeMsg);
      sessionStorage.setItem("welcomeShown", "true");
    }
  }, [currentUsername, userName, speechEnabled]);

  const getAllProducts = useCallback(() => {
    if (!products) return [];
    return Array.isArray(products) ? products : Object.values(products).flat();
  }, [products]);

  const findProductMatchingTranscript = (transcript) => {
    const prods = getAllProducts();
    if (!transcript) return null;
    const t = transcript.toLowerCase();

    let match = prods.find((p) => p.name && t.includes(p.name.toLowerCase()));
    if (match) return match;

    match = prods.find((p) => {
      const words = (p.name || "")
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 2);
      return words.some((w) => t.includes(w));
    });
    if (match) return match;

    const idMatch = transcript.match(/\b(\d{2,5})\b/);
    if (idMatch) {
      const id = Number(idMatch[1]);
      match = prods.find((p) => p.id === id);
      if (match) return match;
    }

    return null;
  };

  const categoryRoutes = {
    veg: "/kitchen/veg",
    dairy: "/kitchen/dairy",
    groceries: "/kitchen/groceries",
    kitchen: "/kitchen",
    mobiles: "/electronics/mobiles",
    laptops: "/electronics/laptops",
    cameras: "/electronics/cameras",
    smarthome: "/electronics/smarthome",
    electronics: "/electronics",
    menswear: "/clothing/mensclothing",
    womenswear: "/clothing/womensclothing",
    kidswear: "/clothing/kidsware",
    clothing: "/clothing",
    slippers: "/footware/slippers",
    shoes: "/footware/shoes",
    footware: "/footware",
    cricket: "/sports/cricket",
    football: "/sports/football",
    sports: "/sports",
  };

  const findCategoryMatchingTranscript = (transcript) => {
    if (!transcript) return null;
    const t = transcript.toLowerCase();
    return (
      Object.keys(categoryRoutes).find((k) => t.includes(k.toLowerCase())) || null
    );
  };

  const stopRecognition = () => {
    intentionallyStoppedRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setListening(false);
    showMessage("Voice recognition stopped.");
  };

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showMessage("Voice recognition not supported in this browser");
      return;
    }

    intentionallyStoppedRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = !!continuous;

    recognition.onstart = () => {
      setListening(true);
      showMessage("Listening...");
    };

    recognition.onresult = (event) => {
      const results = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ")
        .toLowerCase()
        .trim();

      console.log("Heard:", results);

      // --- 👋 Greeting trigger ---
      if (/\b(hello|hi|hey)\b/.test(results)) {
        showMessage(`Hello ${currentUsername || userName}, how can I help you?`);
        if (!listening) {
          setTimeout(() => {
            if (!intentionallyStoppedRef.current) startRecognition();
          }, 500);
        }
        return;
      }

      // Category navigation
      const matchedCategory = findCategoryMatchingTranscript(results);
      if (matchedCategory && categoryRoutes[matchedCategory]) {
        navigate(categoryRoutes[matchedCategory]);
        showMessage(`Showing ${matchedCategory} products...`);
        return;
      }

      // Cart/Wishlist/Checkout
      if (/\b(cart|open cart|show cart)\b/.test(results)) {
        navigate("/cart");
        showMessage("Opening your cart...");
        return;
      }
      if (/\b(wishlist|open wishlist|show wishlist)\b/.test(results)) {
        navigate("/wishlist");
        showMessage("Opening your wishlist...");
        return;
      }
      if (/\b(buy now|buy|checkout|place order)\b/.test(results)) {
        navigate("/buynow");
        showMessage("Taking you to Buy Now...");
        return;
      }

      // Add to cart
      const addCartMatch = results.match(
        /\b(add|put|buy)\s+(?:the\s+)?(.+?)\s*(?:to\s+cart|in cart)?\b/
      );
      if (addCartMatch) {
        const productPhrase = addCartMatch[2].trim();
        const found = findProductMatchingTranscript(productPhrase);
        if (found) {
          dispatch(addToCart(found));
          showMessage(`${found.name} added to cart`);
        } else showMessage("Product not found to add to cart");
        return;
      }

      const foundProduct = findProductMatchingTranscript(results);
      if (foundProduct) {
        dispatch(addToCart(foundProduct));
        showMessage(`${foundProduct.name} added to cart`);
      } else showMessage("No matching product or category found");

      if (!continuous) try { recognition.stop(); } catch (e) {}
    };

    recognition.onerror = (event) => {
      const err = event?.error || "error";
      if (err === "not-allowed" || err === "permission-denied") {
        showMessage("Microphone permission denied. Please allow mic access.");
      } else if (err === "no-speech") {
        showMessage("I didn't catch that. Try again.");
      } else showMessage("Voice recognition error. Try again.");
      setListening(false);
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
      if (continuous && !intentionallyStoppedRef.current) {
        setTimeout(() => {
          if (!intentionallyStoppedRef.current) startRecognition();
        }, 300);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      showMessage("Could not start voice recognition.");
    }
  };

  const handleClick = () => {
    if (listening) stopRecognition();
    else startRecognition();
  };

  // ---- INLINE STYLES ----
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    fontSize: "1.2rem", // smaller icons
  };

  const iconStyle = {
    transition: "transform 0.2s",
  };

  return (
    <div style={containerStyle}>
      {/* Mic / Stop Mic */}
      <i
        className={`bi ${
          listening ? "bi-mic-mute-fill text-danger" : "bi-mic-fill text-success"
        }`}
        style={iconStyle}
        title={listening ? "Stop Voice Assistant" : "Start Voice Assistant"}
        onClick={handleClick}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      ></i>

      {/* Mute / Unmute Speech */}
      <i
        className={`bi ${
          speechEnabled
            ? "bi-volume-up-fill text-primary"
            : "bi-volume-mute-fill text-secondary"
        }`}
        style={iconStyle}
        title={speechEnabled ? "Mute Voice" : "Unmute Voice"}
        onClick={() => setSpeechEnabled((prev) => !prev)}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.3)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      ></i>
    </div>
  );
}
