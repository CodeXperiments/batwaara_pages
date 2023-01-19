/* eslint-disable quote-props */
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider, createEmotionCache } from "@mantine/core";

const appendCache = createEmotionCache({ "key": "mantine", "prepend": false });
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import { ProtectRoute } from "../layout/layout";
import { Lato } from "@next/font/google";
import RouterTransition from "../components/RouterTransistion";

const lato = Lato({
  weight: "400",
  variable: "--font-inter",
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  "pageProps": { session, ...pageProps },
}) => {
  return (
    <main className={`${lato.className}`}>
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
          <ProtectRoute>
            <Component {...pageProps} />
          </ProtectRoute>
        </MantineProvider>
      </SessionProvider>
    </main>
  );
};

export default trpc.withTRPC(MyApp);
