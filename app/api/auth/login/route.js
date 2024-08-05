import AppError from "@/apiErrorWrapper/errHandler";
import { errWrapperAsync } from "@/apiErrorWrapper/errWrapper";
import { createSessionCookie } from "@/helpers/auth/methods/createSessionCookie";
import { verifyAccount } from "@/helpers/auth/methods/verifyAccount";
import emailVal from "@/helpers/auth/validators/emailVal";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = (request) => errWrapperAsync(request, async () => {
    const body = await request.json()

    const { email, password } = body


    if (!email || !password) {
        throw new AppError("Provide the required fields", 400)
    }

    const checkEmail = emailVal.safeParse(email)
    if (!checkEmail.success) {
        throw new AppError("Email is not valid", 400)
    }


    const verify = await verifyAccount(email, password)

    if (!verify.success){
        throw new AppError(verify.msg,400)
    }

    const responseUserData = {
        email: verify.user.email,
        role: verify.user.role,
        email_verification: verify.user.email_verification.isVerified,
    }

    const sessionCookie = createSessionCookie(responseUserData)

    cookies().set(...sessionCookie)

    return NextResponse.json({
        success:true,
        msg:"User Verified",
        user: responseUserData
    })

})