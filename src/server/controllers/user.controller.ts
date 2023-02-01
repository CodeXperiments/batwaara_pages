import { Prisma, PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { UserRegisterInput } from "../schema/user.schema";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const userRegister = async ({ input }: { input: UserRegisterInput }) => {
  const { email, password, name } = input;

  if (!email || !password) {
    return {
      "message": "Email and password are required",
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      "data": {
        "email": email,
        "password": hashedPassword,
        "name": name,
      },
    });

    return user;
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new TRPCError({
          "code": "CONFLICT",
          "message": "Email ID is already registered",
        });
      }
    }
    throw error;
  }
};

// export const userLogin = async (input: UserLoginInput) => {
//   const { email, password } = input;

//   if (!email || !password) {
//     return {
//       "message": "Email and password are required",
//     };
//   }

//   try {
//     const exitingUser = await prisma.user.findUniqueOrThrow({
//       "where": {
//         "email": email,
//       },
//     });

//     const match = await bcrypt.compare(password, exitingUser.password!);

//     if (!match) {
//       throw new Error("Provided credentials do not match!");
//     }

//     const user = {
//       "email": exitingUser.email,
//       "name": exitingUser.name,
//     };

//     return user;
//   } catch (error: any) {
//     if (error instanceof Prisma.PrismaClientKnownRequestError) {
//       if (error.code === "P2025") {
//         throw new TRPCError({
//           "code": "CONFLICT",
//           "message": "User does not exists",
//         });
//       }
//     }
//     throw error;
//   }
// };
