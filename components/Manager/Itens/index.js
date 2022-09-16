import * as C from "./styles";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaSearch,
  FaBan,
  FaChevronRight,
  FaChevronLeft,
  FaCog,
  FaListOl,
} from "react-icons/fa";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import mainApi from "../../../pages/api/manager/mainApi";
import categoriaApi from "../../../pages/api/manager/categoria";
import { AnimatePresence } from "framer-motion";
import { Modal } from "../Modal";
import TopBarProgress from "react-topbar-progress-indicator";
import { useSession } from "next-auth/react";
import Slide from "react-reveal/Slide";
import { PaginasContent } from "../PaginasContent";
let page = 1;
import { Ordernar } from "../Ordenar";
import categoria from "../../../pages/api/manager/categoria";

export const Itens = ({ iten, categorys, img, pagina }) => {
  const [valueCat, setValueCat] = useState("");
  const [q, setQ] = useState("");
  const [activeSerch, setActiveSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(categorys.categories);
  const [activeCategory, setActiveCategory] = useState(false);
  const [dataItes, setDataItens] = useState(iten.itens);
  const [orderData, setOrderData] = useState([]);
  const [modal, setModal] = useState(false);
  const [idImgDel, setIdImgDel] = useState(null);
  const [showOrdernar, setShowOrdernar] = useState(false);

  const [modalPagina, setModalPagina] = useState(false);

  const loadingData = async () => {
    const jsonPosts = await mainApi.getData(page, iten.link, valueCat);
    setDataItens([]);
    setDataItens(jsonPosts.itens);
  };
  function handleClick(e) {
    //e.target onde/quem foi clicado
    if (e.target.classList.contains("modalBg")) {
      setModalPagina(false);
      setShowOrdernar(false);
      loadingData();
    }
  }

  console.log(dataItes);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setModalPagina(false);
      setShowOrdernar(false);
      loadingData();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  let path = iten.path;

  TopBarProgress.config({
    barColors: {
      0: "#21f356",
      "1.0": "#21f356",
    },
    shadowBlur: 5,
  });
  const handleDeleteImg = async (id) => {
    setModal(!modal);
    setIdImgDel(id);
  };

  const { data: session } = useSession();

  const handleMorePosts = async () => {
    page += 1;
    if (activeCategory === true) {
      const json = await categoriaApi.getSingleCategory(
        valueCat,
        page,
        iten.link
      );
      setDataItens(json.itens);
    } else {
      const json = await mainApi.getData(page, iten.link, valueCat);
      setDataItens(json.itens);
    }
  };

  const handleLessPosts = async () => {
    page -= 1;
    if (activeCategory === true) {
      const json = await categoriaApi.getSingleCategory(
        valueCat,
        page,
        iten.link
      );
      setDataItens(json.itens);
    } else {
      const json = await mainApi.getData(page, iten.link, valueCat);
      setDataItens(json.itens);
    }
  };

  const handleCat = async (e) => {
    setActiveSearch(false);
    setQ("");
    page = 1;
    setValueCat(e);
    console.log(e);
    if (e !== "0") {
      setActiveCategory(true);
      let json = await categoriaApi.getSingleCategory(e, page, iten.link);
      setDataItens([]);
      setDataItens(json.itens);
    }
    if (e === "0") {
      setActiveCategory(false);
      let json = await mainApi.getData(page, iten.link, valueCat);
      setDataItens(json.itens);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (q !== "") {
      setActiveSearch(true);
      setValueCat("0");
      let json = await mainApi.search(q, iten.link);
      setDataItens(json.itens);
    } else {
      setActiveSearch(false);
      page = 1;
      let json = await mainApi.getData(page, iten.link, valueCat);
      setDataItens(json.itens);
    }
  };

  const handleVisivel = async (id, check, activeCategory, e) => {
    setLoading(true);
    let v = null;
    if (check === 1) {
      v = true;
    } else if (check === 0) {
      v = false;
    }
    let json = await mainApi.changeVisivel(
      id,
      v,
      iten.link,
      session.user.token
    );
    setLoading(false);

    if (json.error !== "") {
      alert("erro");
      setLoading(false);
      return;
    } else {
      if (activeSerch === true) {
        let jsonSearch = await mainApi.search(q, iten.link);
        console.log(jsonSearch.itens);
        setDataItens([]);
        setDataItens(jsonSearch.itens);
      } else if (activeCategory === true && e !== 0) {
        let jsonCategories = await categoria.getSingleCategory(
          e,
          page,
          iten.link
        );
        setDataItens([]);
        setDataItens(jsonCategories.itens);
        return;
      } else if (activeSerch === false && e === 0) {
        const jsonPosts = await mainApi.getData(page, iten.link, valueCat);
        setDataItens([]);
        setDataItens(jsonPosts.itens);
      } else {
        const jsonPosts = await mainApi.getData(page, iten.link, valueCat);
        setDataItens([]);
        setDataItens(jsonPosts.itens);
      }
    }
  };

  const handleShowOrder = async () => {
    setShowOrdernar(!showOrdernar);
  };

  const loadingItens = async () => {
    if (valueCat === "") {
      setValueCat("0");
    }
    const jsonOrderData = await mainApi.getDataOrder(iten.link, valueCat);
    setOrderData(jsonOrderData.order);
    loadingData();
  };

  useEffect(() => {
    loadingItens();
  }, [showOrdernar]);

  return (
    <C.Content onClick={handleClick}>
      {loading && <TopBarProgress />}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        className="mediaTop"
      >
        <div className="title">
          {iten.name}
          <div onClick={() => handleShowOrder()}>
            <FaListOl />
          </div>
          <div onClick={() => setModalPagina(true)}>
            <FaCog />
          </div>
        </div>
        <div className="btnsGallery">
          <div className="categoryLibrary">
            <form className="globalForm">
              <select
                style={{ padding: "10px" }}
                value={valueCat}
                onChange={(e) => handleCat(e.target.value)}
              >
                {categories.map((item, k) => (
                  <>
                    <option key={k} value={item.id}>
                      {item.name}
                    </option>
                  </>
                ))}
              </select>
            </form>
          </div>
          <form onSubmit={handleSearch} className="globalSearchInput">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Procurar"
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
        </div>
      </motion.div>
      <div className="add">
        <Link href={`/manager/${iten.link}/adicionar`}>
          <button>Adicionar</button>
        </Link>
      </div>

      <div className="container">
        {dataItes.data.length > 0 &&
          dataItes.data.map((item, k) => (
            <div className="item" key={k}>
              <div className="globalSpace">
                {item.visivel === 1 ? (
                  <C.ShowItens>
                    <button
                      id={k}
                      onClick={() =>
                        handleVisivel(
                          item.id,
                          item.visivel,
                          activeCategory,
                          valueCat
                        )
                      }
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
                      onClick={() =>
                        handleVisivel(
                          item.id,
                          item.visivel,
                          activeCategory,
                          valueCat
                        )
                      }
                    >
                      <label className="switch">
                        <input type="checkbox" checked={false} />
                        <span className="slider round"></span>
                      </label>
                    </button>
                  </C.ShowItens>
                )}
                {img === "banner" && (
                  <img alt="" src={`${path}/${item.banner}`} />
                )}
                {img === "capa" && <img alt="" src={`${path}/${item.capa}`} />}
                <div className="btnsItem">
                  <p>{item.title}</p>
                  <div>
                    <Link href={`/manager/${iten.link}/editar/${item.id}`}>
                      <a>
                        <button>
                          <FaEdit size={15} />
                        </button>
                      </a>
                    </Link>
                    <button onClick={() => handleDeleteImg(item.id)}>
                      <FaTrash size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        {dataItes.data.length == 0 && <h4>Nenhum item foi encontrado</h4>}
      </div>
      {activeSerch === false && (
        <div className="btnPage">
          <button
            style={{
              pointerEvents: dataItes.prev_page_url === null ? "none" : "",
              opacity: dataItes.prev_page_url === null ? "0.4" : "1",
            }}
            onClick={handleLessPosts}
          >
            <FaChevronLeft />
          </button>
          <button
            style={{
              pointerEvents: dataItes.next_page_url === null ? "none" : "",
              opacity: dataItes.next_page_url === null ? "0.4" : "1",
            }}
            onClick={handleMorePosts}
          >
            <FaChevronRight />
          </button>
        </div>
      )}
      <Slide when={modalPagina} bottom>
        <div className={modalPagina === true ? "modalBg" : ""}>
          {modalPagina && (
            <PaginasContent pagina={pagina} modalPagina={modalPagina} />
          )}
        </div>
      </Slide>
      <Slide when={showOrdernar} bottom>
        <div className={showOrdernar === true ? "modalBg" : ""}>
          {showOrdernar && (
            <Ordernar
              dataItens={orderData}
              setShowOrdernar={setShowOrdernar}
              link={iten.link}
            />
          )}
        </div>
      </Slide>
      <AnimatePresence exitBeforeEnter>
        {modal && (
          <Modal
            setModal={setModal}
            id={idImgDel}
            type={iten.link}
            token={session.user.token}
          />
        )}
      </AnimatePresence>
    </C.Content>
  );
};
