import AppError from "@/apiErrorWrapper/errHandler";
import { errWrapperAsync } from "@/apiErrorWrapper/errWrapper";
import { cookies } from "next/headers";

export const EnsureLoggedIn = (request,next)=>errWrapperAsync(request,async(request)=>{
    const cookieStore = cookies()
    const isCookiePresent = cookieStore.has(process.env.CookieName)
    console.log(cookieStore.getAll()
    )

    if (!isCookiePresent){
        throw new AppError("Cookie not present",401)
    }
    console.log("hi")
    return next()
})