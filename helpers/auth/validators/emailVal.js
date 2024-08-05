import { z } from "zod";

const emailVal = z.string().email("Email is not valid");

export default emailVal;
