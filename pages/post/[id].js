import blogApi from "../api/blogApi";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import * as C from "../../styles/Site/teste";
import { motion } from "framer-motion";

import react, { useEffect, useState } from "react";

const PostId = ({ post }) => {
  const item = post.post;
  const [user, setUser] = useState({});

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
      y: "100%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };
  return (
    <C.Content>
      <Head>
        <title>{item.title}</title>
      </Head>

      <motion.div
        key="1"
        initial={{ y: "-100%", opacity: 0 }}
        className="left"
        animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
        exit={{ y: "100%", opacity: 0, transition: { duration: 0.7 } }}
      >
        <h3>{item.title}</h3>
        <section
          className="not-found-controller"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
        <Link href="/">
          <button>Back</button>
        </Link>
      </motion.div>
      <div className="right">
        <motion.img
          key="2"
          initial={{ y: "100%", opacity: 0 }}
          className="left"
          animate={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
          exit={{ y: "-100%", opacity: 0, transition: { duration: 0.7 } }}
          src={item.photos[0].url}
        />
      </div>
    </C.Content>
  );
};

export const getStaticPaths = async () => {
  const posts = await blogApi.getPosts();

  let paths = posts.posts.map((post) => ({
    params: {
      id: post.id.toString(),
    },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;

  let post = await blogApi.getSinglePost(id);
  return {
    props: {
      post,
    },
  };
};

export default PostId;
