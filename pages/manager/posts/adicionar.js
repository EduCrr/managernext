import { Default } from "../../../components/Manager/Default";
import * as C from "../../../components/Manager/FormContentSingle/styles";
import { useState, useEffect, useRef } from "react";
import { FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import postApi from "../../api/manager/postApi";
import categoria from "../../api/manager/categoria";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import pt from "date-fns/locale/pt";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
registerLocale("pt", pt);
import { CropItens } from "../../../components/Manager/CropItens";
import { CropFiles } from "../../../components/Manager/CropFiles";
import { useSession } from "next-auth/react";
import { ModalSucess } from "../../../components/Manager/ModalSucess";
import { AnimatePresence } from "framer-motion";
import { ModalError } from "../../../components/Manager/ModalError";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Adicionar = () => {
  const [imgFile, setImgFile] = useState([]);
  const [bannerFile, setBannerFile] = useState();
  const [description, setDescription] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [title, setTitle] = useState("");
  const [tituloPagina, setTituloPagina] = useState("");
  const [tituloCom, setTituloCom] = useState("");
  const [descricaoPagina, setDescricaoPagina] = useState("");
  const [descricaoCom, setDescricaoCom] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("");
  const [day, setDay] = useState("");
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
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

  const { data: session } = useSession();

  useEffect(() => {
    const categories = async () => {
      let json = await categoria.getCategories();
      if (json.error !== "") {
        console(json.error);
      } else {
        setCategorys(json.categories);
        // setActiveCategory(json.categories[0].id);
        console.log();
      }
    };
    categories();
  }, []);

  const convertDate = (str) => {
    str = str.toString();
    let parts = str.split(" ");
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    let d = parts[3] + "-" + months[parts[1]] + "-" + parts[2] + " " + parts[4];
    setDay(d);
  };

  useEffect(() => {
    convertDate(startDate);
  }, [startDate]);

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

  function handleChange(description) {
    setDescription(description);
  }

  const handleForm = async (e) => {
    e.preventDefault();

    let banner = b64toBlob(resultBanner);

    const json = await postApi.addPost(
      title,
      tituloPagina,
      tituloCom,
      descricaoPagina,
      descricaoCom,
      description,
      activeCategory,
      banner,
      day,
      session.user.token
    );

    if (json.error === "") {
      setModalSucess(true);
      setTitle("");
      setDescription(null);
      setTituloCom("");
      setTituloPagina("");
      setDescricaoCom("");
      setDescricaoPagina("");
      setActiveCategory("");
      setBannerFile("");
      setDay("");
      setResultBanner();
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(json.error);
      return;
    }
  };

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    const requestOptions = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${session.user.token}`,
      },
    };
    fetch("http://127.0.0.1:8000/api/postimage", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        let response = {
          result: [
            {
              url: data.location,
            },
          ],
        };
        uploadHandler(response);
      });
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
        "image",
        "video",
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
              placeholder="title"
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
              value={description}
              defaultValue=""
              placeholder="Escreva aqui..."
              onImageUploadBefore={handleImageUploadBefore}
            />
            <DatePicker
              locale="pt"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="yyyy-M-d, h:mm aa"
            />
            <CropFiles
              setSrcImg={setSrcImg}
              result={resultBanner}
              name="Imagem"
              setShowCropImg={setShowCropBanner}
              setResult={setResultBanner}
              path=""
            />
            <CropItens
              srcImg={srcImg}
              showCropImg={showCropBanner}
              image={image}
              setImage={setImage}
              w="550"
              h="550"
              setResult={setResultBanner}
              setShowCropImg={setShowCropBanner}
              setChangeBanner={setChangeBanner}
            />
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
            <button type="submit">Adicionar post</button>
          </form>
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
