import Link from "next/link";
import { Default } from "../../../components/Manager/Default";
import * as C from "../../../styles/Manager/categorias";
import { useState } from "react";
import { useRouter } from "next/router";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { ModalSucess } from "../../../components/Manager/ModalSucess";
import { AnimatePresence } from "framer-motion";
import { ModalError } from "../../../components/Manager/ModalError";
import categoria from "../../api/manager/categoria";
const Adicionar = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const { data: session } = useSession();
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");

  const handleTitle = (name) => {
    setTitle(name);
  };
  const handleForm = async (e) => {
    e.preventDefault();

    let json = await categoria.createCat(title, session.user.token);
    if (json.error === "") {
      setModalSucess(true);
      setTitle("");
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(json.error);
    }
  };

  return (
    <>
      <Default>
        <C.Content>
          <h4>Adicionar Categoria</h4>
          <div className="formCat">
            <form className="globalForm" onSubmit={handleForm}>
              <input
                placeholder="Título"
                value={title}
                onChange={(e) => handleTitle(e.target.value)}
              />
              <button type="submit">Adicionar</button>
            </form>
          </div>
        </C.Content>
      </Default>
      <AnimatePresence exitBeforeEnter>
        {modalSucess && <ModalSucess setModalSucess={setModalSucess} />}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {modalErro && (
          <ModalError setModalErro={setModalErro} text={textErro} />
        )}
      </AnimatePresence>
    </>
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
