import Link from "next/link";
import * as C from "./styles";
import { FaEdit, FaTrash, FaListOl } from "react-icons/fa";
import { useEffect, useState } from "react";
import categoria from "../../../pages/api/manager/categoria";
import { Modal } from "../Modal";
import { AnimatePresence } from "framer-motion";
import TopBarProgress from "react-topbar-progress-indicator";
import { useSession } from "next-auth/react";
import { Ordernar } from "../Ordenar";
import Slide from "react-reveal/Slide";

export const CatItens = ({ categorys }) => {
  const [cats, setCats] = useState(categorys);
  const [modal, setModal] = useState(false);
  const [idCat, setIdCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOrdernar, setShowOrdernar] = useState(false);

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
    let json = await categoria.changeVisivelCategory(
      id,
      v,
      link,
      session.user.token
    );
    setLoading(false);
    let jsonCat = await categoria.getCategoriesVisivelPrivate(categorys.link);
    if (jsonCat.error === "") {
      console.log(jsonCat);
      setCats(jsonCat);
    } else {
      alert("sem categorias");
    }
  };

  return (
    <C.Content>
      <Slide when={showOrdernar} bottom>
        <div className={showOrdernar === true ? "modalBg" : ""}>
          {showOrdernar && (
            <Ordernar
              dataItens={cats.categories}
              setShowOrdernar={setShowOrdernar}
              link={categorys.link}
            />
          )}
        </div>
      </Slide>

      {loading && <TopBarProgress />}
      <div className="init">
        <h2>Categorias</h2>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowOrdernar(!showOrdernar)}
        >
          <FaListOl />
        </div>
        <Link href={`/manager/${categorys.link}/adicionar`}>
          <a>Adicionar</a>
        </Link>
      </div>
      {cats.categories.map((item, k) => (
        <div className="containerCategorys" key={k}>
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
