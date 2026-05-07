import { NextFunction, Request, Response } from "express";
import { ApiError } from "../error/api.error";

export const errorMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    console.error(err);

    return res.status(500).json({
        message: "Internal Server Error",
    });
};
