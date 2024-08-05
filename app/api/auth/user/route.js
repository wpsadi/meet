import { RunAsMiddlewares } from "@/api-middlewares-runner/middelwareWrapper";
import { errWrapperAsync } from "@/apiErrorWrapper/errWrapper";
import { EnsureLoggedIn } from "@/middlewares/EnsureLoggedIn";
import { NextResponse } from "next/server";


export const GET = (req)=>RunAsMiddlewares(req, [EnsureLoggedIn,errWrapperAsync(req,(req)=>{
  return NextResponse.json({
    success:true,
    msg:"Hello"
  })

})])