import AppError from "@/apiErrorWrapper/errHandler"
import { NextResponse } from "next/server"

export const RunAsMiddlewares = async (req,fnArray)=>{
  if (!(fnArray instanceof Array)) {
    return NextResponse.json({
      success: false,
      msg: "Array of middlewares expected but not found",
    });
  }

  for (const fn of fnArray) {
    let nextCalled = false;
    const next = () => {
      nextCalled = true;
    };

    // Execute the current middleware function
    await fn(req, NextResponse, next);

    // If the middleware function did not call next, break the loop
    if (!nextCalled) {
      return NextResponse;
    }
  }

  // If all middleware functions called next, return a success response
  return NextResponse.next();
};


