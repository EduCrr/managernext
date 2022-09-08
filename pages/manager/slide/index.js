import Link from "next/link";
import * as C from "../../../styles/Manager/slide";
import { Default } from "../../../components/Manager/Default";
import { FaHome, FaEnvira, FaDiceD6 } from "react-icons/fa";
import { motion } from "framer-motion";
import { Slides } from "../../../components/Manager/slides";
import blogApi from "../../api/blogApi";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

const Slide = ({ slides }) => {
  return (
    <Default>
      <C.Content>
        <motion.div initial="hidden" animate="enter" exit="exit">
          <Slides slides={slides} />
        </motion.div>
      </C.Content>
    </Default>
  );
};

export default Slide;

export const getServerSideProps = async (context) => {
  const slides = await blogApi.getSlidesPrivate();

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
      slides,
    },
  };
};
