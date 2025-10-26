import { z, ZodType } from "zod";

export type UserRegistrationProps = {
  type: string;
  fullname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export const UserRegistrationSchema = z
  .object({
    type: z.string().min(1),
    fullname: z
      .string()
      .min(4, { message: "Your full name must be at least 4 characters long" }),
    email: z.string().email({ message: "Incorrect email format" }),
    confirmEmail: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Your password must be at least 8 characters long" })
      .max(64, { message: "Your password cannot be longer than 64 characters" })
      .refine((value) => /^[a-zA-Z0-9._-]*$/.test(value ?? ""), {
        message: "Password should contain only alphabets and numbers",
      }),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: "You must enter a 6 digit code" }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: "Your emails do not match",
    path: ["confirmEmail"],
  });
