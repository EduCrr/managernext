import { Default } from "../../../components/Manager/Default";
import { Itens } from "../../../components/Manager/Itens";
import { Content } from "../../../components/Manager/Content";
import { motion } from "framer-motion";
import blogApi from "../../api/blogApi";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

const Home = ({ contents, pagina }) => {
  return (
    <Default>
      <motion.div initial="hidden" animate="enter" exit="exit">
        <Content contents={contents} pagina={pagina} />
      </motion.div>
    </Default>
  );
};

export default Home;

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
  const contents = await blogApi.getCotentHome("home");
  const pagina = await blogApi.getPagina("home");
  return {
    props: {
      contents,
      pagina,
    },
  };
};
