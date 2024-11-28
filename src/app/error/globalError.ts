import { NextFunction, Response } from "express";
import { Error } from "mongoose";

export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction):void => {

    let statusCode = 500;
    let message = "Internal Server Error";
    let stack = err.stack;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        stack
    })
    next()


}