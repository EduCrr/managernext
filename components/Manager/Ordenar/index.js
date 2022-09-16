import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as C from "./styles";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { useSession } from "next-auth/react";
import mainApi from "../../../pages/api/manager/mainApi";

export const Ordernar = ({ dataItens, setShowOrdernar, link }) => {
  const easing = [0.6, -0.05, 0.01, 0.99];
  const { data: session } = useSession();

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
        <p>{value.title}</p>
      </div>
    );
  });
  const onSortEnd = async ({ oldIndex, newIndex }) => {
    let arr = arrayMove(dataItens, oldIndex, newIndex);
    for (let i = 0; i < arr.length; i++) {
      arr[i].posicao = i;
    }

    let itensOrder = JSON.stringify(dataItens);
    let json = await mainApi.orderItens(itensOrder, link, session.user.token);
  };

  return (
    <C.Content>
      <div className="modal">
        <div className="contentModal">
          <div onClick={() => setShowOrdernar(false)} className="close-modal">
            &times;
          </div>
          <SortableList items={dataItens} onSortEnd={onSortEnd} axis="y" />
        </div>
      </div>
    </C.Content>
  );
};
