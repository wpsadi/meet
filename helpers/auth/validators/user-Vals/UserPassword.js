import { z } from "zod";

const UserPassVal =z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must be at most 128 characters long")
      .refine(
        (value) => /[a-z]/.test(value),
        "Password must contain at least one lowercase letter"
      )
      .refine(
        (value) => /[A-Z]/.test(value),
        "Password must contain at least one uppercase letter"
      )
      .refine(
        (value) => /[0-9]/.test(value),
        "Password must contain at least one digit"
      )
      .refine(
        (value) => /[^a-zA-Z0-9]/.test(value),
        "Password must contain at least one special character"
      )
      .refine((value) => !/\s/.test(value), "Password must not contain spaces")
  );

export default UserPassVal;
