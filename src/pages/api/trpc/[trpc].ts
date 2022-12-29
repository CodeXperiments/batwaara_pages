/* eslint-disable indent */
import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server.mjs";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";

// export API handler
export default createNextApiHandler({
  "router": appRouter,
  createContext,
  "onError":
    env.NODE_ENV === "development"
      ? ({ path, error }): void => {
          if (path)
            console.error(
              `❌ tRPC failed on ${path}: ${JSON.stringify(error)}`
            );
        }
      : undefined,
});
