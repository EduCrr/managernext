import Link from "next/link";
import * as C from "./styles";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import blogApi from "../../../pages/api/blogApi";
import { Modal } from "../Modal";
import { AnimatePresence } from "framer-motion";
import TopBarProgress from "react-topbar-progress-indicator";
import { useSession } from "next-auth/react";
import { Ordernar } from "../Ordenar";
export const CatItens = ({ categorys }) => {
  const [cats, setCats] = useState(categorys);
  const [modal, setModal] = useState(false);
  const [idCat, setIdCat] = useState(null);
  const [loading, setLoading] = useState(false);

  TopBarProgress.config({
    barColors: {
      0: "#21f356",
      "1.0": "#21f356",
    },
    shadowBlur: 5,
  });

  const { data: session } = useSession();

  console.log(categorys.link);

  const handleDelete = async (id) => {
    setModal(!modal);
    setIdCat(id);
  };

  const handleVisivel = async (id, check, link) => {
    let v = null;
    if (check === 1) {
      v = true;
    } else if (check === 0) {
      v = false;
    }
    setLoading(true);
    let json = await blogApi.changeVisivelCategory(
      id,
      v,
      link,
      session.user.token
    );
    setLoading(false);
    let jsonCat = await blogApi.getCategoriesVisivelPrivate(categorys.link);
    if (jsonCat.error === "") {
      console.log(jsonCat);
      setCats(jsonCat);
    } else {
      alert("sem categorias");
    }
  };

  return (
    <C.Content>
      <Ordernar dataItens={cats.categories} />
      {loading && <TopBarProgress />}
      <div className="init">
        <h2>Categorias</h2>
        <Link href={`/manager/${categorys.link}/adicionar`}>
          <a>Adicionar</a>
        </Link>
      </div>
      {cats.categories.map((item, k) => (
        <div className="containerCategorys" key={k}>
          <div className="id">#{item.id}</div>
          <div className="name">{item.name}</div>
          {item.visivel === 1 ? (
            <div className="btns">
              <button
                id={k}
                className="radio"
                onClick={() =>
                  handleVisivel(item.id, item.visivel, categorys.link)
                }
              >
                <label className="switch">
                  <input type="checkbox" checked={true} />
                  <span className="slider round"></span>
                </label>
              </button>
              <Link href={`/manager/${categorys.link}/edit/${item.id}`}>
                <a>
                  <button>
                    <FaEdit />
                  </button>
                </a>
              </Link>
              <button onClick={() => handleDelete(item.id)}>
                <FaTrash />
              </button>
            </div>
          ) : (
            <div className="btns">
              <button
                id={k}
                className="radio"
                onClick={() =>
                  handleVisivel(item.id, item.visivel, categorys.link)
                }
              >
                <label className="switch">
                  <input type="checkbox" checked={false} />
                  <span className="slider round"></span>
                </label>
              </button>
              <Link href={`/manager/${categorys.link}/edit/${item.id}`}>
                <a>
                  <button>
                    <FaEdit />
                  </button>
                </a>
              </Link>
              <button onClick={() => handleDelete(item.id)}>
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      ))}
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <Modal
            setModal={setModal}
            id={idCat}
            type={categorys.link}
            token={session.user.token}
          />
        )}
      </AnimatePresence>
    </C.Content>
  );
};
