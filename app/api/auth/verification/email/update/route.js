import { RunAsMiddlewares } from "@/api-middlewares-runner/middelwareWrapper";
import { errWrapperAsync, errWrapperNextAsync } from "@/apiErrorWrapper/errWrapper";
import { verifyEmail } from "@/helpers/auth/methods/verifyEmail";
import { EnsureEmailVerified } from "@/middlewares/EnsureEmailVerified";
import { EnsureLoggedIn } from "@/middlewares/EnsureLoggedIn";
import { NextResponse } from "next/server";

const updateEmail = (req,next,store)=>errWrapperNextAsync(req,next,store, async(request)=>{
    const user = store.user

    const email = user.email

    await verifyEmail(email)
  return NextResponse.json({
    success:true,
    msg:"Email Verified",
    user:{
      email:email,
      role:user.role,
      email_verification:true
    }
  })
})


export const GET = (req)=>RunAsMiddlewares(req, [EnsureLoggedIn,updateEmail])