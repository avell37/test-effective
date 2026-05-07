import { ApiError } from "../error/api.error";
import prisma from "../prisma/client";

export class UserService {
    static async getUserById(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                fullName: true,
                birthDate: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        if (!user) {
            throw new ApiError(404, "Пользователь не найден");
        }

        return user;
    }

    static async getAllUsers() {
        return prisma.user.findMany({
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    static async toggleBlockUser(id: string) {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new ApiError(404, "Пользователь не найден");
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                isActive: !user.isActive,
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
                isActive: true,
            },
        });

        return updatedUser;
    }
}

export default new UserService();
