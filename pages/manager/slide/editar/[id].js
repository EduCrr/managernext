import { Default } from "../../../../components/Manager/Default";
import * as C from "../../../../styles/Manager/editar";
import { useState } from "react";
import { motion } from "framer-motion";
import slidesApi from "../../../api/manager/slidesApi";
import { useRouter } from "next/router";
import { CropFiles } from "../../../../components/Manager/CropFiles";
import { CropItens } from "../../../../components/Manager/CropItens";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { ModalSucess } from "../../../../components/Manager/ModalSucess";
import { ModalError } from "../../../../components/Manager/ModalError";

const Editar = ({ slide }) => {
  const [title, setTitle] = useState(slide.slide.title);

  //Crop
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [changeBanner, setChangeBanner] = useState(false);
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");

  //banner
  const [showCropBanner, setShowCropBanner] = useState(false);
  const [resultBanner, setResultBanner] = useState(null);

  let id = slide.slide.id;
  let path = slide.path;

  const router = useRouter();
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

  const handleSaveForm = async (e) => {
    e.preventDefault();

    let json = await slidesApi.updateSlide(title, id, session.user.token);
    let imagem = b64toBlob(resultBanner);

    let jsonImagem = await slidesApi.updateSlideImagem(
      imagem,
      id,
      session.user.token
    );
    if (json.error === "") {
      setModalSucess(true);
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(json.error);
    }
  };

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

            <CropFiles
              setSrcImg={setSrcImg}
              result={resultBanner}
              name="Banner"
              path={`${path}/${slide.slide.imagem}`}
              setShowCropImg={setShowCropBanner}
              setResult={setResultBanner}
            />
            <button type="submit">Salvar</button>
          </form>
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
    </Default>
  );
};

export const getServerSideProps = async (context) => {
  const slide = await slidesApi.getSingleSlide(context.query.id);
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
      slide,
    },
  };
};

export default Editar;
