import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as C from "../../../styles/Manager/login";
import { motion } from "framer-motion";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    setHasError("");

    if (!email || !password) {
      setHasError("Preencha todos os campos!");
      return;
    }

    setLoading(true);
    const request = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (request && request.ok) {
      if (router.query.callbackUrl) {
        router.push("/manager/home");
        setLoading(false);
      } else {
        router.push("/manager/home");
        setLoading(false);
      }
    } else {
      setHasError("Acesso negado");
      setLoading(false);
    }
  };

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
      <div className="modal">
        <motion.div
          transition={{ delay: 0.3 }}
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="login">
            <div className="loginContent">
              <h2>Autentifique</h2>
              <div className="globalForm">
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Senha"
                />
                <button onClick={handleSubmit}>Login</button>
                {hasError} {loading && "Carregando"}
              </div>
            </div>
            <div className="footer">
              <span> Desenvolvido por:</span>
              <Link href="/">
                <a>
                  <img alt="" src="/8poroito.png" />
                </a>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="content">
        <div className="left"></div>
        <div className="right"></div>
      </div>
    </C.Content>
  );
};

export default Login;
