import "../styles/globals.scss";
import { AnimatePresence } from "framer-motion";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {
  return (
    <SessionProvider session={session}>
      <AnimatePresence exitBeforeEnter>
        <Component
          {...pageProps}
          key={router.route}
          onExitComplete={() => window.scrollTo(0, 0)}
        />
      </AnimatePresence>
    </SessionProvider>
  );
}

export default MyApp;
