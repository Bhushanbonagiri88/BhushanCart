import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SplashScreen.css";

function SplashScreen({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="splash-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          {/* 🚴 Delivery boy */}
          <motion.img
            src="/images/delivery-boy.png"
            alt="Delivery Boy"
            className="bike"
            initial={{ x: "-100%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />

          {/* 🛍️ Logo */}
          <motion.img
            src="/images/logo.png"
            alt="Bhushan Cart"
            className="logo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 1.2,
              ease: [0.25, 1, 0.5, 1], // smooth bounce ease
            }}
          />

          {/* ✨ Tagline */}
          <motion.h2
            className="tagline"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
          >
            Fast • Fresh • Reliable 🚀
          </motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;
