import Head from "next/head";
import Image from "next/image";
import * as C from "../styles/Site/index";
import { motion } from "framer-motion";
import Link from "next/link";
import blogApi from "./api/blogApi";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Home({ posts, categories }) {
  const easing = [0.6, -0.05, 0.01, 0.99];
  // const path = posts.path;
  //  const [postList, setPostList] = useState(posts.posts);
  const { data: session } = useSession();

  const fadeInUp = {
    initial: {
      y: 160,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (session) {
    console.log(session);
  }

  return (
    <C.Content>
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        exit="exit"
        className="item"
      >
        {!session && <button onClick={() => signIn()}>Fazer login</button>}
        {session && (
          <>
            {session.user.name}
            <button onClick={() => signOut()}>Sair</button>
            <Link href="/manager/home">
              <a>MANAGER</a>
            </Link>
          </>
        )}
      </motion.div>
    </C.Content>
  );
}

// export const getStaticProps = async () => {
//   const posts = await blogApi.getPosts();
//   const { categories } = await blogApi.getCategories();
//   return {
//     props: {
//       posts,
//       categories,
//     },
//     revalidate: 300,
//   };
// };
