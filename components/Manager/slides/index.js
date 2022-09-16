import * as C from "../Itens/styles";
import { FaEdit, FaTrash, FaListOl } from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Modal } from "../Modal";
import { AnimatePresence } from "framer-motion";
import TopBarProgress from "react-topbar-progress-indicator";
import { useSession } from "next-auth/react";
import { Ordernar } from "../Ordenar";
import Slide from "react-reveal/Slide";
import slidesApi from "../../../pages/api/manager/slidesApi";

export const Slides = ({ slides }) => {
  const [slidesItens, setSlidesItens] = useState(slides);
  const [modal, setModal] = useState(false);
  const [idImgDel, setIdImgDel] = useState(null);
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

  const router = useRouter();
  let path = slides.path;

  const handleDelete = (id) => {
    setModal(!modal);
    setIdImgDel(id);
  };

  const getSlides = async () => {
    let json = await slidesApi.getSlidesPrivate();
    if (json.error === "") {
      console.log(json);
      setSlidesItens(json);
    } else {
      alert("sem slides");
    }
  };

  const handleVisivel = async (id, check) => {
    let v = null;
    if (check === 1) {
      v = true;
    } else if (check === 0) {
      v = false;
    }
    setLoading(true);
    let json = await slidesApi.changeVisivelSlide(id, v, session.user.token);
    setLoading(false);
    getSlides();
  };

  return (
    <C.Content>
      <div className="align">
        {loading && <TopBarProgress />}
        <h2>Slides</h2>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setShowOrdernar(!showOrdernar)}
        >
          <FaListOl />
        </div>
      </div>
      <div className="add">
        <Link href="/manager/slide/adicionar">
          <button>Adicionar</button>
        </Link>
      </div>

      <div className="container">
        {slidesItens.slides.map((item, k) => (
          <div className="item" key={k}>
            <div className="globalSpace">
              {item.visivel === 1 ? (
                <C.ShowItens>
                  <button
                    id={k}
                    onClick={() => handleVisivel(item.id, item.visivel)}
                  >
                    <label className="switch">
                      <input type="checkbox" checked={true} />
                      <span className="slider round"></span>
                    </label>
                  </button>
                </C.ShowItens>
              ) : (
                <C.ShowItens>
                  <button
                    id={k}
                    onClick={() => handleVisivel(item.id, item.visivel)}
                  >
                    <label className="switch">
                      <input type="checkbox" checked={false} />
                      <span className="slider round"></span>
                    </label>
                  </button>
                </C.ShowItens>
              )}

              <img alt="" src={`${path}/${item.imagem}`} />
              <div className="btnsItem">
                <p>{item.title}</p>
                <div>
                  <Link href={`/manager/slide/editar/${item.id}`}>
                    <a>
                      <button>
                        <FaEdit size={15} />
                      </button>
                    </a>
                  </Link>
                  <button onClick={() => handleDelete(item.id)}>
                    <FaTrash size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Slide when={showOrdernar} bottom>
        <div className={showOrdernar === true ? "modalBg" : ""}>
          {showOrdernar && (
            <Ordernar
              dataItens={slidesItens.slides}
              setShowOrdernar={setShowOrdernar}
              link={slidesItens.link}
            />
          )}
        </div>
      </Slide>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <Modal
            setModal={setModal}
            id={idImgDel}
            type="slide"
            token={session.user.token}
          />
        )}
      </AnimatePresence>
    </C.Content>
  );
};
