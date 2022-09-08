import Link from "next/link";
import { Default } from "../../../components/Manager/Default";
import { Itens } from "../../../components/Manager/Itens";
import blogApi from "../../api/blogApi";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { FormContentSingle } from "../../../components/Manager/formContentSingle";

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
  const post = await blogApi.getPosts();
  const categorys = await blogApi.getCategoriesPrivate();
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const pagina = await blogApi.getPagina("posts");
  const contents = await blogApi.getCotentHome("posts");

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
