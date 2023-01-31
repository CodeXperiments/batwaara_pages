import { z } from "zod";

const passwordRegEx = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/g;

export const userRegisterSchema = z.object({
  "email": z
    .string({
      "required_error": "Email is required",
    })
    .email({ "message": "Please provide valid email" }),
  "password": z
    .string({ "required_error": "Password is required" })
    .regex(passwordRegEx, {
      "message":
        "Password must be 8 characters long and must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
    }),
});

export type UserRegisterInput = z.TypeOf<typeof userRegisterSchema>;
