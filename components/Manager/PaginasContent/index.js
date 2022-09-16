import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as C from "./styles";
import { CropFiles } from "../CropFiles";
import { CropItens } from "../CropItens";
import { AnimatePresence } from "framer-motion";
import { ModalError } from "../ModalError";
import { ModalSucess } from "../ModalSucess";
import { useSession } from "next-auth/react";
import paginaApi from "../../../pages/api/manager/paginaApi";

export const PaginasContent = ({ pagina, modalPagina }) => {
  const [titulo, setTitulo] = useState(pagina[0].titulo);
  const [descricao, setDescricao] = useState(pagina[0].descricao);
  const [tituloCom, setTituloCom] = useState(pagina[0].titulo_compartilhamento);
  const [descricaoCom, setDescricaoCom] = useState(
    pagina[0].descricao_compartilhamento
  );
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");

  let path = pagina.path;
  //Crop
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [changeBanner, setChangeBanner] = useState(false);

  //banner
  const [showCropBanner, setShowCropBanner] = useState(false);
  const [resultBanner, setResultBanner] = useState(null);

  const { data: session } = useSession();

  function b64toBlob(dataURI) {
    if (dataURI !== null) {
      var byteString = atob(dataURI.split(",")[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: "image/jpeg" });
    }
  }

  const handleForm = async (e) => {
    e.preventDefault();

    let json = await paginaApi.updatePagina(
      titulo,
      descricao,
      tituloCom,
      descricaoCom,
      pagina[0].id,
      session.user.token
    );
    let imagem = b64toBlob(resultBanner);

    let jsonImagem = await paginaApi.updatePaginaImagem(
      imagem,
      pagina[0].id,
      session.user.token
    );

    if (json.error !== "") {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(json.error);
      return;
    } else {
      setModalSucess(true);
    }
  };

  return (
    <>
      <C.Content modalPagina={modalPagina}>
        <div className="paginas">
          <div className="contentPaginas">
            <form className="globalForm" onSubmit={handleForm}>
              <input
                placeholder="Título"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <input
                placeholder="Descrição"
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <input
                placeholder="Título compartilhamento"
                type="text"
                value={tituloCom}
                onChange={(e) => setTituloCom(e.target.value)}
              />
              <input
                placeholder="Descrição compartilhamento"
                value={descricaoCom}
                onChange={(e) => setDescricaoCom(e.target.value)}
                type="text"
              />
              <CropFiles
                setSrcImg={setSrcImg}
                result={resultBanner}
                name="Imagem"
                path={`${path}/${pagina[0].imagem}`}
                setShowCropImg={setShowCropBanner}
                setResult={setResultBanner}
              />
              <button type="submit">Salvar</button>
            </form>
          </div>
        </div>
      </C.Content>
      <AnimatePresence exitBeforeEnter>
        {modalSucess && <ModalSucess setModalSucess={setModalSucess} />}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {modalErro && (
          <ModalError setModalErro={setModalErro} text={textErro} />
        )}
      </AnimatePresence>
      <CropItens
        srcImg={srcImg}
        showCropImg={showCropBanner}
        image={image}
        setImage={setImage}
        w="1280"
        h="720"
        setResult={setResultBanner}
        setShowCropImg={setShowCropBanner}
        setChangeBanner={setChangeBanner}
      />
    </>
  );
};
