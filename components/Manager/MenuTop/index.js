import Link from "next/link";
import * as C from "./styles";
import { FaPowerOff, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { Theme } from "../Theme/Theme";
import { useState } from "react";
import Fade from "react-reveal/Fade";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

import {
  FaHome,
  FaEnvira,
  FaDiceD6,
  FaChevronUp,
  FaChevronDown,
} from "react-icons/fa";
export const MenuTop = () => {
  const [open, setOpen] = useState(false);
  function handleMenu() {
    setOpen(!open);
  }

  const easing = [0.6, -0.05, 0.01, 0.99];

  const fadeInUp = {
    initial: {
      y: 60,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
    exit: {
      x: 100,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing,
      },
    },
  };

  const { data: session } = useSession();

  const router = useRouter();

  const [selected, setSelected] = useState("");

  const data = [
    {
      id: 1,
      name: "Posts",
      link: ["/manager/posts", "/manager/categorias"],

      content: [
        {
          name: "Posts",
          link: "posts",
          activeLink: "/manager/posts",
        },
        {
          name: "Categorias",
          link: "categorias",
          activeLink: "/manager/categorias",
        },
      ],
    },
    {
      id: 2,
      name: "Produtos",
      link: ["/manager/produtos", "/manager/categorias-produtos"],
      content: [
        {
          name: "produtos",
          link: "produtos",
          activeLink: "/manager/produtos",
        },
        {
          name: "Categorias",
          link: "categorias-produtos",
          activeLink: "/manager/categorias-produtos",
        },
      ],
    },
  ];
  return (
    <C.Content>
      <div className="user">
        <div className="menu">
          <span
            className="menuButton"
            style={{ cursor: "pointer" }}
            onClick={handleMenu}
          >
            <FaBars size={22} />
          </span>
          <C.HeaderArea className="menu-state" open={open}>
            <Fade left when={open}>
              <div className="show-infos menu-area">
                <span className="menuButtonHeader" onClick={handleMenu}>
                  <FaTimes size={22} />
                </span>
                <nav>
                  <ul>
                    <li onClick={handleMenu}>
                      <Link scroll={false} href="/manager/home">
                        <div
                          className={
                            router.pathname === "/manager/home"
                              ? "menu active "
                              : "menu"
                          }
                        >
                          <FaHome />
                          <a>Home</a>
                        </div>
                      </Link>
                    </li>
                    <li onClick={handleMenu}>
                      <Link scroll={false} href="/manager/slide">
                        <div
                          className={
                            router.pathname === "/manager/slide"
                              ? "menu active "
                              : "menu"
                          }
                        >
                          <FaHome />
                          <a>Slides</a>
                        </div>
                      </Link>
                    </li>

                    <div className="dropMenu">
                      {data.map((v) => (
                        <li
                          onClick={() =>
                            setSelected(selected !== v.id ? v.id : "")
                          }
                        >
                          <div
                            className={
                              v.link.includes(router.pathname)
                                ? " menu active "
                                : "menu"
                            }
                          >
                            {v.name}
                            {selected !== v.id ? (
                              <FaChevronDown />
                            ) : (
                              <FaChevronUp />
                            )}
                          </div>

                          <C.ShowContentMenu selected={selected}>
                            <ul class="content">
                              {selected === v.id && (
                                <AnimatePresence exitBeforeEnter>
                                  <motion.div
                                    variants={fadeInUp}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                  >
                                    {v.content.map((val) => (
                                      <li onClick={handleMenu}>
                                        <Link
                                          scroll={false}
                                          href={val.activeLink}
                                        >
                                          <div
                                            className={
                                              router.pathname === val.activeLink
                                                ? "menu active "
                                                : "menu"
                                            }
                                          >
                                            <a>
                                              <FaHome />
                                              {val.name}
                                            </a>
                                          </div>
                                        </Link>
                                      </li>
                                    ))}
                                  </motion.div>
                                </AnimatePresence>
                              )}
                            </ul>
                          </C.ShowContentMenu>
                        </li>
                      ))}
                    </div>
                  </ul>
                </nav>
                <div onClick={handleMenu} className="logOut">
                  <span style={{ cursor: "pointer" }} onClick={() => signOut()}>
                    <FaPowerOff />
                  </span>
                </div>
              </div>
            </Fade>
          </C.HeaderArea>
        </div>
        <div className="loggedUser">
          {session && (
            <>
              <img alt="" src={session.user.image} />
              <span style={{ cursor: "pointer" }}>
                <>{session.user.name}</>
              </span>
            </>
          )}
        </div>
        <div className="btnsTop">
          <Theme />
        </div>
      </div>
    </C.Content>
  );
};
