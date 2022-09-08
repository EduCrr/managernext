import { MenuTop } from "../MenuTop";
import * as C from "./styles";
import { motion } from "framer-motion";

export const Default = ({ children }) => {
  return (
    <C.Content>
      <div className="globalMenuTopManager">
        <MenuTop />
      </div>
      <motion.div initial="initial" animate="animate" exit="exit">
        <main className="globalMainManager">{children}</main>
      </motion.div>
    </C.Content>
  );
};
