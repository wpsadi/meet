import AppError from "@/apiErrorWrapper/errHandler";
import { errWrapperAsync } from "@/apiErrorWrapper/errWrapper";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = (req)=>errWrapperAsync(req,async (req)=>{
    const cookieStore = cookies()

    const isCookiePresent = cookieStore.has(process.env.CookieName)

    if (!isCookiePresent){
        throw new  AppError("Already Logged Out",200)
    }

    cookieStore.set(process.env.CookieName,"g",{
        httpOnly:true,
        expires:new Date().getTime()-100000,
        secure:false,
        sameSite:"lax"
    })

    return NextResponse.json({
        success:true,
        msg:"Logged Out"
    })

})