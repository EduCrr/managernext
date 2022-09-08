import Link from "next/link";
import { Default } from "../../../components/Manager/Default";
import { Itens } from "../../../components/Manager/Itens";
import blogApi from "../../api/blogApi";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

const Produtos = ({ products, categorys, pagina }) => {
  return (
    <Default>
      <Itens iten={products} categorys={categorys} pagina={pagina} img="capa" />
    </Default>
  );
};

export default Produtos;

export const getServerSideProps = async (context) => {
  const products = await blogApi.getProductsPrivate();
  const categorys = await blogApi.getCategoriesProductsPrivate();
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const pagina = await blogApi.getPagina("produtos");

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
      products,
      categorys,
      pagina,
    },
  };
};
