import AppError from "@/apiErrorWrapper/errHandler";
import { errWrapperAsync, errWrapperNextAsync } from "@/apiErrorWrapper/errWrapper";
import { cookies } from "next/headers";
import JWT from "jsonwebtoken"

export const EnsureLoggedIn = (request,next,store)=>errWrapperNextAsync(request,next,store,async(request)=>{
    const cookieStore = cookies()
    const isCookiePresent = cookieStore.has(process.env.CookieName)

    if (!isCookiePresent){
        throw new AppError("Login first",401)
    }

    const token = cookieStore.get(process.env.CookieName).value
    store.token = token

    // Extracting payload from cookie
    const payload = JWT.verify(token,process.env.JWT_SECRET)
    store.user = payload


    return next()
})