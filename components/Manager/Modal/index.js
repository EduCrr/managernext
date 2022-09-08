import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import blogApi from "../../../pages/api/blogApi";
import * as C from "./styles";
export const Modal = ({ setModal, id, type, token }) => {
  const router = useRouter();

  const delImage = async () => {
    if (type === "images") {
      let json = await blogApi.deleteImage(id, token);
    } else if (type === "categorias") {
      let json = await blogApi.deleteCat(id, token);
    } else if (type === "categorias-produtos") {
      let json = await blogApi.deleteCatProduct(id, token);
    } else if (type === "posts") {
      let json = await blogApi.deletePost(id, token);
    } else if (type === "slide") {
      let json = await blogApi.deleteSlide(id, token);
    } else if (type === "produtos") {
      let json = await blogApi.deleteProduct(id, token);
    }
    setModal(false);
    setTimeout(function () {
      router.reload(window.location.pathname);
    }, 1000);
  };

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
        className="modal"
      >
        <div onClick={() => setModal(false)} className="close-modal">
          &times;
        </div>
        <div className="contentModal">
          <h4>Você tem certeza que deseja excluir?</h4>
          <div style={{ display: "flex" }}>
            <button className="bt" onClick={() => delImage()}>
              Sim
            </button>
            <button className="bt" onClick={() => setModal(false)}>
              Não
            </button>
          </div>
        </div>
      </motion.div>
      <div class="overlay"></div>
    </C.Content>
  );
};
