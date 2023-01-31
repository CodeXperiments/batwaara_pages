import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { userRegister } from "../controllers/user.controller";
import { userRegisterSchema } from "../schema/user.schema";

const t = initTRPC.create({
  "transformer": superjson,
});

export const userAuthRouter = t.router({
  "registerUser": t.procedure
    .input(userRegisterSchema)
    .mutation(({ input }) => userRegister({ input })),
});

export type UserAuthRouter = typeof userAuthRouter;
