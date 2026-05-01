import type { NextFunction, Request, RequestHandler, Response } from "express";
import type { ApiError } from "./ApiError";

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => unknown,
) => {

   // Passes the callback function inside the returned function, and resolves callback
   return (req: Request, res: Response, next: NextFunction) => {

      // If rejected, return error response
      Promise.resolve(fn(req, res, next)).catch((error: ApiError) => {
      console.log('Something went wrong when try to do task ',error)
    });
  };
};