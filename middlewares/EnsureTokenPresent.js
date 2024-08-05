import { errWrapperAsync } from "@/apiErrorWrapper/errWrapper";
import { cookies } from "next/headers";

export const EnsureTokenPresent = (request,next)=>errWrapperAsync(request,async(request)=>{
    const cookieStore = cookies()
    const isCookiePresent = cookieStore.has(process.env.CookieName)

    if (!isCookiePresent){
        throw new Error("Cookie not present")
    }
    console.log("hi")
    next()
})