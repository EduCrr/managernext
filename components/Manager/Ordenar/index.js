import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import blogApi from "../../../pages/api/blogApi";
import * as C from "./styles";

import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
export const Ordernar = ({ dataItens }) => {
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

  const SortableList = SortableContainer(({ items }) => {
    return (
      <div className="contentDrag">
        {items
          .sort((a, b) => a.posicao - b.posicao)
          .map((value, index) => (
            <SortableItem value={value} index={index} key={value.id} />
          ))}
      </div>
    );
  });
  const SortableItem = SortableElement(({ value, index }) => {
    return (
      <div className="containerDrag" key={value.id} index={index}>
        <p>{value.name}</p>
      </div>
    );
  });
  const onSortEnd = async ({ oldIndex, newIndex }) => {
    let arr = arrayMove(dataItens, oldIndex, newIndex);
    for (let i = 0; i < arr.length; i++) {
      arr[i].posicao = i;
    }

    let itensOrder = JSON.stringify(dataItens);
    let json = await blogApi.orderItens(itensOrder);
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
        <div className="contentModal">
          <SortableList items={dataItens} onSortEnd={onSortEnd} axis="y" />
        </div>
      </motion.div>
      <div class="overlay"></div>
    </C.Content>
  );
};
