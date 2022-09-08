import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as C from "./styles";
export const ModalError = ({ setModalErro, text }) => {
  const easing = [0.6, -0.05, 0.01, 0.99];

  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
    exit: {
      y: "20vh",
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };

  return (
    <C.Content>
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        exit="exit"
        className="modalSuccess"
      >
        <div className="contentModal">
          <h2>Erro</h2>
          <p>{text}</p>
          <div>
            <button onClick={() => setModalErro(false)}>Fechar</button>
          </div>
        </div>
      </motion.div>
    </C.Content>
  );
};
