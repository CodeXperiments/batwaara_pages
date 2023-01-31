import { userAuthRouter } from "../../router/user.router";
import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";

export const appRouter = router({
  "example": exampleRouter,
  "auth": authRouter,
  // "userAuth": userAuthRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
