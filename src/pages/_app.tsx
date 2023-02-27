/* eslint-disable quote-props */
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider, createEmotionCache } from "@mantine/core";
import localFont from "@next/font/local";

const appendCache = createEmotionCache({ "key": "mantine", "prepend": false });
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import RouterTransition from "../components/RouterTransistion";

const chromatica = localFont({
  src: "../../public/fonts/Chromatica-Regular.woff2",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  "pageProps": { session, ...pageProps },
}) => {
  return (
    <main className={`${chromatica.className}`}>
      <SessionProvider session={session}>
        <MantineProvider
          emotionCache={appendCache}
          withGlobalStyles
          withNormalizeCSS
          theme={{
            "colors": { "brand": ["#27A4A6", "#40F2A6", "#000000"] },
            "primaryColor": "brand",
          }}
        >
          <RouterTransition />
          <Component {...pageProps} />
        </MantineProvider>
      </SessionProvider>
    </main>
  );
};

export default trpc.withTRPC(MyApp);
