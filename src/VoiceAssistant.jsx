// VoiceAssistant.js
import React, { useState, useRef, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./Store";
import { useNavigate } from "react-router-dom";

export default function VoiceAssistant({
  products,
  triggerToast,      // optional: function to show header toast (string)
  continuous = false  // optional: if true, toggle continuous listening
}) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const intentionallyStoppedRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showMessage = (msg) => {
    if (typeof triggerToast === "function") triggerToast(msg);
    else alert(msg);
  };

  // flatten products if state.products is an object of categories
  const getAllProducts = useCallback(() => {
    if (!products) return [];
    return Array.isArray(products)
      ? products
      : Object.values(products).flat();
  }, [products]);

  const findProductMatchingTranscript = (transcript) => {
    const prods = getAllProducts();
    transcript = transcript.toLowerCase();

    // 1) direct includes
    let match = prods.find(
      (p) => p.name && transcript.includes(p.name.toLowerCase())
    );
    if (match) return match;

    // 2) partial word match (any significant word)
    match = prods.find((p) => {
      const words = (p.name || "").toLowerCase().split(/\s+/).filter(w => w.length > 2);
      return words.some((w) => transcript.includes(w));
    });
    return match;
  };

  const stopRecognition = () => {
    intentionallyStoppedRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }
  };

  const startRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      showMessage("❌ Voice recognition not supported in this browser");
      return;
    }

    // Reset flag
    intentionallyStoppedRef.current = false;

    // If there is an existing instance, stop it first
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
      recognitionRef.current = null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.continuous = !!continuous; // when continuous = true keep listening

    recognition.onstart = () => {
      setListening(true);
      showMessage("🎧 Listening...");
    };

    recognition.onresult = (event) => {
      // combine results (handles continuous mode too)
      const results = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join(" ")
        .toLowerCase()
        .trim();

      console.log("🎤 Heard:", results);

      // navigation commands
      if (results.includes("cart")) {
        navigate("/cart");
        showMessage("🛒 Opening your cart...");
      } else if (results.includes("wishlist")) {
        navigate("/wishlist");
        showMessage("❤️ Opening your wishlist...");
      } else if (results.includes("buy") || results.includes("shop")) {
        navigate("/buynow");
        showMessage("🛍️ Taking you to Buy Now...");
      } else {
        const foundProduct = findProductMatchingTranscript(results);
        if (foundProduct) {
          dispatch(addToCart(foundProduct));
          showMessage(`✅ ${foundProduct.name} added to cart 🛒`);
        } else {
          showMessage("❌ Product not found 🔎");
        }
      }

      // if not continuous, stop after first result
      if (!continuous) {
        try { recognition.stop(); } catch (e) {}
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event);
      const err = event?.error || "error";
      if (err === "not-allowed" || err === "permission-denied") {
        showMessage("⚠️ Microphone permission denied. Please allow mic access.");
      } else if (err === "no-speech") {
        showMessage("⚠️ I didn't catch that. Try again 🎙️");
      } else {
        showMessage("⚠️ Voice recognition error. Try again.");
      }
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      setListening(false);
      // If continuous mode and not intentionally stopped, attempt to restart to remain resilient
      if (continuous && !intentionallyStoppedRef.current) {
        // short delay to avoid rapid restart loops
        setTimeout(() => {
          if (!intentionallyStoppedRef.current) startRecognition();
        }, 250);
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      console.error("start error", e);
      showMessage("⚠️ Could not start voice recognition.");
    }
  };

  const handleClick = () => {
    if (continuous) {
      // toggle in continuous mode
      if (listening) {
        stopRecognition();
      } else {
        startRecognition();
      }
    } else {
      // single-shot: always start fresh
      startRecognition();
    }
  };

  return (
   <button
  type="button"
  className="btn btn-outline-primary ms-2 d-flex align-items-center justify-content-center rounded-circle"
  style={{ width: "28px", height: "28px", fontSize: "12px", lineHeight: 1 }}
  onClick={handleClick}
  aria-pressed={listening}
  title="Voice Assistant"
>
  {listening ? "🎙️" : "🎤"}
</button>

  );
}
