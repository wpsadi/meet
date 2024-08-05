import { z } from "zod";
import emailVal from "../emailVal.js";
import { CheckEmailAlreadyExist } from "../../CheckEmailAlreadyExist.js";

let errorVal;

const UseremailVal = z.preprocess(
  (value) => (typeof value === "string" ? value.trim() : value),
  emailVal.superRefine(async (value, ctx) => {
    // Initial email validation
    const emailValidation = emailVal.safeParse(value);
    if (!emailValidation.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email is not valid. Retry again",
        path: [], // Path can be empty if you want to indicate a general error
      });
      return; // Exit early if initial validation fails
    }

    // Check for spaces
    if (/\s/.test(value)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email must not contain spaces",
        path: [],
      });
      return; // Exit early if space check fails
    }

    // Transform to lowercase
    value = value.toLowerCase();

    // Check if email already exists
    const isUnique = await CheckEmailAlreadyExist(value);
    if (!isUnique.success) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: isUnique.msg,
        path: [],
      });
      return; // Exit early if email is not unique
    }

    // Final check for email uniqueness
    if (isUnique.present) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email already exists",
        path: [],
      });
    }
  })
);

export default UseremailVal;
