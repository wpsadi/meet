import { RunAsMiddlewares } from "@/api-middlewares-runner/middelwareWrapper";
import { errWrapperAsync, errWrapperNextAsync } from "@/apiErrorWrapper/errWrapper";
import { GetEmailVerificationStatus } from "@/helpers/auth/methods/getVerificationStatus";
import { EnsureEmailVerified } from "@/middlewares/EnsureEmailVerified";
import { EnsureLoggedIn } from "@/middlewares/EnsureLoggedIn";
import { NextResponse } from "next/server";

const EmailUpdate = (req,next,store)=>errWrapperNextAsync(req,next,store, async(request)=>{
    const user = store.user

    const email = user.email

    const resp = await GetEmailVerificationStatus(email)

    if (resp.success == false) {
        throw new AppError(resp.msg)
    }

    if (resp.found == false) {
        throw new AppError("User doesn't exist")
    }

   

    if (resp.is_verified == false) {
        store.user = {
            ...store.user,
            email_verification: false
        }
    }
    else{
        store.user = {
            ...store.user,
            email_verification: true
        }
    
    }




  return NextResponse.json({
    success:true,
    msg:"Updated User Details",
    user:{
      email:store.user.email,
      role:store.user.role,
      email_verification:store.user.email_verification
    }
  })
})


export const GET = (req)=>RunAsMiddlewares(req, [EnsureLoggedIn,EmailUpdate])