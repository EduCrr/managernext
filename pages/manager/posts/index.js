import Link from "next/link";
import { Default } from "../../../components/Manager/Default";
import { Itens } from "../../../components/Manager/Itens";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { FormContentSingle } from "../../../components/Manager/formContentSingle";
import postApi from "../../api/manager/postApi";
import mainApi from "../../api/manager/mainApi";
import categoriaApi from "../../api/manager/categoria";
import paginaApi from "../../api/manager/paginaApi";
import contentApi from "../../api/manager/contentApi";
const Posts = ({ post, categorys, pagina, contents }) => {
  let path = contents.path;

  return (
    <Default>
      {contents.content.map((item, k) => (
        <FormContentSingle dataItens={item} key={k} path={path} />
      ))}
      <Itens iten={post} categorys={categorys} pagina={pagina} img="banner" />
    </Default>
  );
};

export default Posts;

export const getServerSideProps = async (context) => {
  const post = await postApi.getPostsPrivate();
  const categorys = await categoriaApi.getCategoriesPrivate();
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const pagina = await paginaApi.getPagina("posts");
  const contents = await contentApi.getCotentHome("posts");

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
      post,
      categorys,
      pagina,
      contents,
    },
  };
};
