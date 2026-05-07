import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt.types";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "Нет доступа" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Нет токена" });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
        ) as JwtPayload;

        req.user = {
            id: decoded.id,
            role: decoded.role,
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Неверный токен" });
    }
};
