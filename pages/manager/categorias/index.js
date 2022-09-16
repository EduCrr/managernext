import Link from "next/link";
import { Default } from "../../../components/Manager/Default";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import categoria from "../../api/manager/categoria";

import { CatItens } from "../../../components/Manager/CatItens";
const Categorias = ({ categorys }) => {
  return (
    <Default>
      <CatItens categorys={categorys} />
    </Default>
  );
};

export default Categorias;

export const getServerSideProps = async (context) => {
  const categorys = await categoria.getCategoriesPrivate();
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
      categorys,
    },
  };
};
