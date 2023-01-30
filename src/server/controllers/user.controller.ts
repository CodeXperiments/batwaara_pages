import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { UserRegisterInput } from "../schema/user.schema";

const prisma = new PrismaClient();

export const userRegister = async ({ input }: { input: UserRegisterInput }) => {
  const { email, password } = input;

  if (!email || !password) {
    return {
      "message": "Email and password are required",
    };
  }

  try {
    const user = await prisma.user.create({
      "data": {
        "email": input.email,
        "password": input.password,
      },
    });

    return {
      "status": "success",
      "data": {
        user,
      },
    };
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Note with that title already exists",
        });
      }
    }
    throw error;
  }
};
