import { z } from "zod";

import UserRoleVal from "./user-Vals/UserRoleVal.js";
import UseremailVal from "./user-Vals/UserEmailVal.js";
import UserPassVal from "./user-Vals/UserPassword.js";

export const UserCreateVal = z.object({
  email: UseremailVal,


  role: UserRoleVal,


  password: UserPassVal,
});
