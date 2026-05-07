import { NextFunction, Request, Response } from "express";

export const selfOrAdminMiddlware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const currentUser = req.user;

    const targetUserId = req.params.id;

    if (!currentUser) {
        return res.status(401).json({ message: "Неавторизован" });
    }

    const isAdmin = currentUser.role === "ADMIN";

    const isSelf = currentUser.id === targetUserId;

    if (!isAdmin && !isSelf) {
        return res.status(403).json({ message: "Доступ запрещен" });
    }

    next();
};
