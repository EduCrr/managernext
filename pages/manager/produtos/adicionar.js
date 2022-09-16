import { Default } from "../../../components/Manager/Default";
import * as C from "../../../components/Manager/FormContentSingle/styles";
import { useState, useEffect, useRef } from "react";
import { FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { CropItens } from "../../../components/Manager/CropItens";
import { CropFiles } from "../../../components/Manager/CropFiles";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { ModalSucess } from "../../../components/Manager/ModalSucess";
import { AnimatePresence } from "framer-motion";
import { ModalError } from "../../../components/Manager/ModalError";
import produtoApi from "../../api/manager/produtoApi";
import categoria from "../../api/manager/categoria";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Adicionar = () => {
  const [imgFile, setImgFile] = useState([]);
  const [description, setDescription] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [title, setTitle] = useState("");
  const [tituloPagina, setTituloPagina] = useState("");
  const [tituloCom, setTituloCom] = useState("");
  const [descricaoPagina, setDescricaoPagina] = useState("");
  const [descricaoCom, setDescricaoCom] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");

  //Crop
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [changeBanner, setChangeBanner] = useState(false);

  //banner
  const [showCropBanner, setShowCropBanner] = useState(false);
  const [resultBanner, setResultBanner] = useState(null);

  //capa
  const [showCropCapa, setShowCropCapa] = useState(false);
  const [resultCapa, setResultCapa] = useState(null);

  let fotoField = useRef();
  const { data: session } = useSession();

  useEffect(() => {
    const categories = async () => {
      let json = await categoria.getCategoriesProductsPrivate();
      if (json.error !== "") {
        console(json.error);
      } else {
        setCategorys(json.categories);
        console.log();
      }
    };
    categories();
  }, []);

  const onImageChange = (e) => {
    const imgs = e.target.files;
    setImgFile([]);
    if (imgs) {
      for (let files of imgs) {
        setImgFile((oldArray) => [...oldArray, URL.createObjectURL(files)]);
      }
      console.log(imgFile);
    } else {
      setImgFile();
    }
  };

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

  function handleChange(text) {
    setDescription(text);
    if (modalSucess === true) {
      text = "";
      setDescription("");
    }
  }

  const handleForm = async (e) => {
    e.preventDefault();

    let banner = b64toBlob(resultBanner);
    let capa = b64toBlob(resultCapa);

    const json = await produtoApi.addProduct(
      title,
      tituloPagina,
      tituloCom,
      descricaoPagina,
      descricaoCom,
      description,
      activeCategory,
      banner,
      capa,
      fotoField,
      session.user.token
    );

    if (json.error === "") {
      setModalSucess(true);
      setTitle("");
      setTituloCom("");
      setTituloPagina("");
      setDescricaoCom("");
      setDescricaoPagina("");
      setDescription("");
      setResultBanner(null);
      setResultCapa(null);
      setImgFile([]);
      setActiveCategory("");
      fotoField = "";
      return;
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(json.error);
      return;
    }
  };

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
        "paragraphStyle",
        "blockquote",
        "bold",
        "underline",
        "italic",
        "strike",
        "fontColor",
        "hiliteColor",
        "textStyle",
        "removeFormat",
        "outdent",
        "indent",
        "align",
        "list",
        "lineHeight",
        "link",
        "fullScreen",
        "showBlocks",
        "codeView",
        "preview",
      ],
    ],
  };

  return (
    <Default>
      <C.Content>
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          style={{ width: "97%", margin: "1rem auto" }}
        >
          <form className="globalForm" onSubmit={handleForm}>
            <input
              placeholder="Título"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categorys.map((item, k) => (
                <option key={k} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <SunEditor
              setOptions={opitons}
              onChange={handleChange}
              defaultValue=""
              value={description}
              placeholder="Escreva aqui..."
            />

            <CropFiles
              setSrcImg={setSrcImg}
              result={resultBanner}
              name="Banner"
              setShowCropImg={setShowCropBanner}
              setResult={setResultBanner}
              path=""
            />

            <CropFiles
              setSrcImg={setSrcImg}
              result={resultCapa}
              name="capa"
              setShowCropImg={setShowCropCapa}
              setResult={setResultCapa}
              path=""
            />

            <div className="addImg">
              <h3>Imagens</h3>
              <input
                type="file"
                id="file"
                multiple
                ref={fotoField}
                onChange={onImageChange}
                style={{ display: "none" }}
              />
              {imgFile === 1 && <p>{imgFile} imagem selecionada</p>}
              {imgFile > 1 && <p>{imgFile} imagens selecionadas</p>}
              <label htmlFor="file">
                <div className="bt" htmlFor="file">
                  Adicionar
                </div>
              </label>
            </div>

            {loading === true ? "Carregando" : ""}
            <div className="containerImgs">
              {imgFile !== "" &&
                imgFile.map((item, k) => (
                  <div
                    className="contentImgs"
                    key={k}
                    style={{ pointerEvents: "none" }}
                  >
                    <div className="photo">
                      <img alt="" src={item} />
                    </div>
                  </div>
                ))}
            </div>
            <input
              placeholder="Título da página"
              type="text"
              value={tituloPagina}
              onChange={(e) => setTituloPagina(e.target.value)}
            />
            <input
              placeholder="Descrição da página"
              type="text"
              value={descricaoPagina}
              onChange={(e) => setDescricaoPagina(e.target.value)}
            />
            <input
              placeholder="Título exibido ao compartilhar"
              type="text"
              value={tituloCom}
              onChange={(e) => setTituloCom(e.target.value)}
            />
            <input
              placeholder="Descrição exibida ao compartilhar"
              type="text"
              value={descricaoCom}
              onChange={(e) => setDescricaoCom(e.target.value)}
            />
            <button type="submit">Adicionar Produto</button>
          </form>
          <CropItens
            srcImg={srcImg}
            showCropImg={showCropBanner}
            image={image}
            setImage={setImage}
            w="1920"
            h="810"
            setResult={setResultBanner}
            setShowCropImg={setShowCropBanner}
            setChangeBanner={setChangeBanner}
          />
          <CropItens
            srcImg={srcImg}
            showCropImg={showCropCapa}
            image={image}
            setImage={setImage}
            w="550"
            h="550"
            setResult={setResultCapa}
            setShowCropImg={setShowCropCapa}
            setChangeBanner={setChangeBanner}
          />
        </motion.div>
      </C.Content>
      <AnimatePresence exitBeforeEnter>
        {modalSucess && <ModalSucess setModalSucess={setModalSucess} />}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {modalErro && (
          <ModalError setModalErro={setModalErro} text={textErro} />
        )}
      </AnimatePresence>
    </Default>
  );
};

export default Adicionar;

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/manager/login",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};
