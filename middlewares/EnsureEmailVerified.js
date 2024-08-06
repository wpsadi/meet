import AppError from "@/apiErrorWrapper/errHandler";
import { errWrapperAsync, errWrapperNextAsync } from "@/apiErrorWrapper/errWrapper";
import { cookies } from "next/headers";
import JWT from "jsonwebtoken"
import { GetEmailVerificationStatus } from "@/helpers/auth/methods/getVerificationStatus";

export const EnsureEmailVerified = (request, next, store) => errWrapperNextAsync(request, next, store, async (request) => {
    const user = store.user

    const email = user.email

    const resp = await GetEmailVerificationStatus(email)

    if (resp.success == false) {
        throw new AppError(resp.msg)
    }

    if (resp.found == false) {
        throw new AppError("User doesn't exist")
    }

    store.user = {
        ...store.user,
        email_verification: false
    }

    if (resp.is_verified == false) {
        throw new AppError(JSON.stringify({
            msg: "Plz verify your email by visiting this url",
            url: `${process.env.BaseURL}/api/auth/verification/email/update`
        }))
    }

    store.user = {
        ...store.user,
        email_verification: true
    }


    return next()
})