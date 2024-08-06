import AppError from "@/apiErrorWrapper/errHandler"
import { errWrapperAsync } from "@/apiErrorWrapper/errWrapper"
import next from "next";
import { NextResponse } from "next/server"

export const RunAsMiddlewares = async (req, fnArray) => errWrapperAsync(req, async (req) => {

  if (!(fnArray instanceof Array)) {
    return NextResponse.json({
      success: false,
      msg: "Array of middlewares expected but not found",
    });
  }

  const countFn = fnArray.length

  if (countFn < 2) {
    throw new AppError("At least 2 middlewares are required")
  }
  
  const chainStore = {}

  let start = 0
  async function startChain(store){
    let currentFuntion = fnArray[start]
    let nextFunction = fnArray[start+1]
    const next =async ()=>{
      start++
      if (start == countFn){
        throw new AppError("No more middlewares to run")
      }
      currentFuntion = fnArray[start]
      nextFunction = fnArray[start+1]

      return await currentFuntion(req,next,store)
    }
    return await currentFuntion(req,next,store)
  }

  return await startChain(chainStore)
})


