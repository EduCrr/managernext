import { Default } from "../../../../components/Manager/Default";
import * as C from "../../../../styles/Manager/editar";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import postApi from "../../../api/manager/postApi";
import categoria from "../../../api/manager/categoria";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { useRouter } from "next/router";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import pt from "date-fns/locale/pt";
registerLocale("pt", pt);
import { CropFiles } from "../../../../components/Manager/CropFiles";
import { CropItens } from "../../../../components/Manager/CropItens";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { ModalSucess } from "../../../../components/Manager/ModalSucess";
import { ModalError } from "../../../../components/Manager/ModalError";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Editar = ({ post }) => {
  const [imgFile, setImgFile] = useState([]);
  const [bannerFile, setBannerFile] = useState();
  const [description, setDescription] = useState(post.post.description);
  const [categorys, setCategorys] = useState([]);
  const [postIten, setPostIten] = useState(post.post);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(post.post.title);
  const [tituloPagina, setTituloPagina] = useState(post.post.titulo_pagina);
  const [tituloCom, setTituloCom] = useState(post.post.descricao_pagina);
  const [descricaoPagina, setDescricaoPagina] = useState(
    post.post.titulo_compartilhamento
  );
  const [descricaoCom, setDescricaoCom] = useState(
    post.post.descricao_compartilhamento
  );
  const [idImgDel, setIdImgDel] = useState(null);
  const [activeCategory, setActiveCategory] = useState(post.post.category.id);
  const [day, setDay] = useState("");
  const [startDate, setStartDate] = useState(new Date(post.post.publish));
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

  let id = post.post.id;
  let path = post.pathBanner;
  const router = useRouter();
  let fotoField = useRef();
  let bannerField = useRef();
  console.log(post);

  useEffect(() => {
    const categories = async () => {
      let json = await categoria.getCategories();
      if (json.error !== "") {
        console(json.error);
      } else {
        setCategorys(json.categories);
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

  function handleChange(text) {
    setDescription(text);
  }

  console.log(description);

  const handleSaveForm = async (e) => {
    e.preventDefault();

    let json = await postApi.updatePost(
      title,
      tituloPagina,
      tituloCom,
      descricaoPagina,
      descricaoCom,
      description,
      activeCategory,
      day,
      id,
      session.user.token
    );
    if (json.error !== "") {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(json.error);
      return;
    } else {
      if (changeBanner === true && resultBanner !== null) {
        let banner = b64toBlob(resultBanner);
        let json = await postApi.updateBanner(banner, id, session.user.token);
        if (json.error !== "") {
          setModalErro(true);
          setTextErro(
            "Ocorreu algum erro ao inserir a imagem, tente novamente!"
          );
          setBannerFile(`${path}/${postIten.banner}`);
          setChangeBanner(false);
          return;
        } else {
          setChangeBanner(false);
        }
      }
      setModalSucess(true);
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

  return (
    <Default>
      <C.Content>
        <motion.div initial="hidden" animate="enter" exit="exit">
          <form className="globalForm" onSubmit={handleSaveForm}>
            <p className="nameInput">Título</p>
            <input
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="nameInput">Categoria</p>
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
            <p className="nameInput">Descrição</p>
            <SunEditor
              setOptions={opitons}
              value={description}
              defaultValue={description}
              onChange={handleChange}
              placeholder="Escreva aqui..."
              onImageUploadBefore={handleImageUploadBefore}
            />
            <p className="nameInput">Data da postagem</p>
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
              name="Banner"
              path={`${path}/${postIten.banner}`}
              setShowCropImg={setShowCropBanner}
              setResult={setResultBanner}
            />
            <p className="nameInput">Título da página</p>
            <input
              placeholder="Título da página"
              type="text"
              value={tituloPagina}
              onChange={(e) => setTituloPagina(e.target.value)}
            />
            <p className="nameInput">Descrição da página</p>
            <input
              placeholder="Descrição da página"
              type="text"
              value={descricaoPagina}
              onChange={(e) => setDescricaoPagina(e.target.value)}
            />
            <p className="nameInput">Título exibido ao compartilhar</p>
            <input
              placeholder="Título exibido ao compartilhar"
              type="text"
              value={tituloCom}
              onChange={(e) => setTituloCom(e.target.value)}
            />
            <p className="nameInput">Descrição exibida ao compartilhar</p>
            <input
              placeholder="Descrição exibida ao compartilhar"
              type="text"
              value={descricaoCom}
              onChange={(e) => setDescricaoCom(e.target.value)}
            />
            <button type="submit">Salvar</button>
          </form>
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
        </motion.div>
        <AnimatePresence exitBeforeEnter>
          {modalSucess && <ModalSucess setModalSucess={setModalSucess} />}
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {modalErro && (
            <ModalError setModalErro={setModalErro} text={textErro} />
          )}
        </AnimatePresence>
      </C.Content>
    </Default>
  );
};

export const getServerSideProps = async (context) => {
  const post = await postApi.getSinglePost(context.query.id);
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
    props: {
      post,
    },
  };
};

export default Editar;
