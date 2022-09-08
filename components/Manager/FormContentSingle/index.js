import * as C from "./styles";
import { useState, useEffect, useRef } from "react";
import { FaFileAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import blogApi from "../../../pages/api/blogApi";
import { useSession } from "next-auth/react";
import { CropFiles } from "../CropFiles";
import { CropItens } from "../CropItens";
import { AnimatePresence } from "framer-motion";
import { ModalError } from "../ModalError";
import { ModalSucess } from "../ModalSucess";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export const FormContentSingle = ({ dataItens, path }) => {
  const [description, setDescription] = useState(dataItens.description);
  const [title, setTitle] = useState(dataItens.title);
  //Crop
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [changeBanner, setChangeBanner] = useState(false);
  //banner
  const [showCropBanner, setShowCropBanner] = useState(false);
  const [resultBanner, setResultBanner] = useState(null);
  //responsive
  const [showCropResponsive, setShowCropResponsive] = useState(false);
  const [resultResponsive, setResultResponsive] = useState(null);
  const [wI, setWI] = useState(dataItens.largura_imagem);
  const [hE, setHE] = useState(dataItens.altura_imagem);
  const { data: session } = useSession();
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");

  const opitons = {
    mode: "classic",
    rtl: false,
    katex: "window.katex",
    videoFileInput: true,
    tabDisable: false,
    buttonList: [
      [
        "undo",
        "redo",
        "formatBlock",
        "blockquote",
        "bold",
        "underline",
        "italic",
        "strike",
        "link",
        "removeFormat",
        "lineHeight",
        "fullScreen",
        "preview",
      ],
    ],
  };

  function handleChange(text) {
    setDescription(text);
  }

  console.log(dataItens);

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

  const handleContentUpdate = async (e) => {
    e.preventDefault();

    if (
      dataItens.parametros.description === 1 &&
      description === "<h1><br></h1>"
    ) {
      setModalSucess(false);
      setModalErro(true);
      setTextErro("Preencha todos os campos");
      return;
    }

    if (
      title !== "" ||
      description !== "" ||
      resultBanner !== null ||
      resultResponsive !== null
    ) {
      let json = await blogApi.updateContent(
        title,
        description,
        dataItens.id,
        session.user.token
      );
      let imagem = b64toBlob(resultBanner);
      let imagemResponsive = b64toBlob(resultResponsive);

      let jsonImagem = await blogApi.updateContentImagem(
        imagem,
        dataItens.id,
        session.user.token
      );
      console.log(jsonImagem);
      let jsonImagemResponsive = await blogApi.updateContentImagemResponsive(
        imagemResponsive,
        dataItens.id,
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
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro("Preencha todos os campos");
    }
  };

  return (
    <C.Content>
      <form onSubmit={handleContentUpdate} className="globalForm">
        {dataItens.parametros.title === 1 ? (
          <input
            placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          ""
        )}

        {dataItens.parametros.description === 1 ? (
          <SunEditor
            setOptions={opitons}
            onChange={handleChange}
            value={description}
            defaultValue={description}
            placeholder="Escreva aqui..."
          />
        ) : (
          ""
        )}
        {dataItens.parametros.imagem === 1 ? (
          <>
            <CropFiles
              setSrcImg={setSrcImg}
              result={resultBanner}
              name="Imagem"
              id={dataItens.id}
              path={`${path}/${dataItens.imagem}`}
              setShowCropImg={setShowCropBanner}
              setResult={setResultBanner}
            />

            <CropItens
              srcImg={srcImg}
              showCropImg={showCropBanner}
              image={image}
              setImage={setImage}
              w={wI}
              h={hE}
              setResult={setResultBanner}
              setShowCropImg={setShowCropBanner}
              setChangeBanner={setChangeBanner}
            />
          </>
        ) : (
          ""
        )}

        {dataItens.parametros.imagem_responsive === 1 ? (
          <>
            <CropFiles
              setSrcImg={setSrcImg}
              result={resultResponsive}
              name="Imagem responsiva"
              id={dataItens.id}
              path={`${path}/${dataItens.imagem_responsive}`}
              setShowCropImg={setShowCropResponsive}
              setResult={setResultResponsive}
            />

            <CropItens
              srcImg={srcImg}
              showCropImg={showCropResponsive}
              image={image}
              setImage={setImage}
              w="680"
              h="1180"
              setResult={setResultResponsive}
              setShowCropImg={setShowCropResponsive}
              setChangeBanner={setChangeBanner}
            />
          </>
        ) : (
          ""
        )}

        <button type="submit">Salvar</button>
      </form>
      <AnimatePresence exitBeforeEnter>
        {modalSucess && <ModalSucess setModalSucess={setModalSucess} />}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {modalErro && (
          <ModalError setModalErro={setModalErro} text={textErro} />
        )}
      </AnimatePresence>
    </C.Content>
  );
};
