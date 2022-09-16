import Link from "next/link";
import { Default } from "../../../components/Manager/Default";
import { Itens } from "../../../components/Manager/Itens";
import produtoApi from "../../api/manager/produtoApi";
import categoriaApi from "../../api/manager/categoria";
import mainApi from "../../api/manager/mainApi";
import paginaApi from "../../api/manager/paginaApi";
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
  const products = await produtoApi.getProductsPrivate();
  const categorys = await categoriaApi.getCategoriesProductsPrivate();
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const pagina = await paginaApi.getPagina("produtos");

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
