import { useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import mainApi from "../api/manager/mainApi";

function Teste({ teste }) {
  console.loh(teste);
  return <>sad</>;
}
export default Teste;

export const getServerSideProps = async (context) => {
  const teste = await mainApi.getTeste();

  return {
    props: {
      teste,
    },
  };
};
