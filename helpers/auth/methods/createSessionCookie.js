import AppError from "@/apiErrorWrapper/errHandler"
import { createJWTtoken } from "./sessionJWT"
// user should conatin the following fields
// email
// email_verification
// role


// This function return an array of [name,value,options]
export const createSessionCookie = (user)=>{
    const {email,role,email_verification} = user



    if (!email || !role || (![true,false].includes(email_verification))){
        throw new AppError("User object is not valid. This happened when requesting a JWT token for the sucessful login for making the COOKIE. This is a problem with the server")
    }

    const CookieName = process.env.CookieName
    const CookieValue = createJWTtoken(user)

// console.log(CookieValue.payload.validTill ,(new Date().getTime() ))

    const CookieExpiry = CookieValue.payload.validTill - (new Date().getTime() )
    //  console.log(CookieExpiry)
    const cookieOptions = {
        httpOnly:true,
        expires:CookieExpiry + (new Date().getTime() ),
        secure:true,
        sameSite:"strict"
    }

    return [CookieName,CookieValue.token,cookieOptions]



}