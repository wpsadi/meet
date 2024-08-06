import AppError from "@/apiErrorWrapper/errHandler"
import JWT from "jsonwebtoken"

// user should conatin the following fields
// email
// email_verification
// role

export  const createJWTtoken = (user)=>{
    const {email,role,email_verification} = user


    if (!email || !role || (![true,false].includes(email_verification))){
      throw new AppError("User object is not valid. This happened when requesting a JWT token for the sucessful login for making the COOKIE. This is a problem with the server")
  }

    const payload = {
        role,email,
        // email_verification:email_verification,
        createdAt:new Date().getTime(),
        validTill:(new Date().getTime() + parseInt(process.env.CookieExpiry))
      }

    const userToken = JWT.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
      });

      return {
        token:userToken,
        payload
      }
}


