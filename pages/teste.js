import Link from "next/link";
import * as C from "../styles/Site/teste";
import { motion } from "framer-motion";
import mainApi from "./api/manager/mainApi";
import { useState } from "react";

const Teste = ({ teste }) => {
  const easing = [0.6, -0.05, 0.01, 0.99];
  const [info, setInfo] = useState(teste.info);
  const [idioma, setIdioma] = useState("0");

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

  console.log(info[0]);

  const handleIdioma = (e) => {
    setIdioma(e.target.value);
  };

  return (
    <C.Content>
      <select onChange={handleIdioma}>
        <option value="0">Pt</option>
        <option value="1">en</option>
      </select>
      <div className="left">
        <h3>Teste</h3>
        {info.map((item, k) => (
          <div key={k}>
            <p>{item.id}</p>
            <p>{item.idiomas[idioma].titulo}</p>
            <p>{item.idiomas[idioma].descricao}</p>
          </div>
        ))}
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

export const getServerSideProps = async (context) => {
  const teste = await mainApi.getTeste();

  return {
    props: {
      teste,
    },
  };
};
