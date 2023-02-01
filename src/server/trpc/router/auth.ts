import { userRegister } from "../../controllers/user.controller";
import { userLoginSchema, userRegisterSchema } from "../../schema/user.schema";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  "getSession": publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  "getSecretMessage": protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  "registerUser": publicProcedure
    .input(userRegisterSchema)
    .mutation(({ input }) => userRegister({ input })),
});
