import * as C from "./styles";
import { useState, useCallback, useEffect } from "react";
import { PaginasContent } from "../PaginasContent";
import { FormContentSingle } from "../formContentSingle";
import Slide from "react-reveal/Slide";

export const Content = ({ contents, pagina }) => {
  const [contentsFields, setContentsFieds] = useState(contents.content);
  let path = contents.path;
  const [modalPagina, setModalPagina] = useState(false);
  function handleClick(e) {
    //e.target onde/quem foi clicado
    if (e.target.classList.contains("modalBg")) {
      setModalPagina(false);
    }
  }

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setModalPagina(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);
  return (
    <C.Content onClick={handleClick}>
      <div className="headerContent">
        <h3>Conteúdos</h3>
        <button onClick={() => setModalPagina(true)}>Abrir</button>
      </div>
      <Slide when={modalPagina} bottom>
        <div className={modalPagina === true ? "modalBg" : ""}>
          {modalPagina && (
            <PaginasContent pagina={pagina} modalPagina={modalPagina} />
          )}
        </div>
      </Slide>
      {contentsFields.map((item, k) => (
        <FormContentSingle dataItens={item} key={k} path={path} />
      ))}
    </C.Content>
  );
};
