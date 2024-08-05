import { z } from "zod";

const UserRoleVal = z.preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z
      .string()
      .transform((value) => value.toLowerCase())
      .refine(
        (value) => ["admin", "user"].includes(value),
        "Role must be 'admin' or 'user'"
      )
      .refine((value) => !/\s/.test(value), "Role must not contain spaces")
      .default("user")
  );

export default UserRoleVal;
