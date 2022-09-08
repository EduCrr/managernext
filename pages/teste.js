import Link from "next/link";
import * as C from "../styles/Site/teste";
import { motion } from "framer-motion";

const Teste = () => {
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
      y: "100%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };

  return (
    <C.Content>
      <div className="left">
        <h3>Teste</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco
        </p>
        <Link href="/">
          <button>Back</button>
        </Link>
      </div>
      <div className="right">
        <motion.img
          transition={{ delay: 0.3 }}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          src="https://images.unsplash.com/photo-1609942571926-f3fe26feab26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1025&q=80"
        />
      </div>
    </C.Content>
  );
};

export default Teste;
