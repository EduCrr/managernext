import { Default } from "../../../../components/Manager/Default";
import * as C from "../../../../styles/Manager/categorias";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import blogApi from "../../../api/blogApi";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { ModalSucess } from "../../../../components/Manager/ModalSucess";
import { ModalError } from "../../../../components/Manager/ModalError";
const Editar = ({ category }) => {
  console.log(category);
  const [title, setTitle] = useState(category.name);
  const { data: session } = useSession();
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();

    let json = await blogApi.updateCatProduct(
      title,
      category.id,
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
          <h2>{title}</h2>
          <form className="globalForm" onSubmit={handleForm}>
            <input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit">Atualizar</button>
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

export const getServerSideProps = async (context) => {
  const { category } = await blogApi.getSingleCategoryProductEdit(
    context.query.id
  );

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
      category,
    },
  };
};

export default Editar;
