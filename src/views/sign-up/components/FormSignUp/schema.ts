import { z } from "zod";

export const schema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "At least 8 characters are required")
      .regex(/[a-z]/, { message: "At least one lowercase letter is required" })
      .regex(/[A-Z]/, { message: "At least one uppercase letter is required" })
      .regex(/\d/, { message: "At least one number is required" }),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ password, passwordConfirmation }, context) => {
    const doPasswordsMatch = password === passwordConfirmation;

    if (!doPasswordsMatch) {
      context.addIssue({
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });
