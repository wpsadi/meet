  
import bcrypt from "bcrypt"

export function HashPass(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }
  
export function ComparePass(password, hash) {
    return bcrypt.compareSync(password, hash);
  }