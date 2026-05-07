import { RegisterData } from "../types/register.data";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";

export class AuthService {
    static async register(data: RegisterData): Promise<boolean> {
        const { fullName, birthDate, email, password } = data;

        const existingUser = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (existingUser) {
            throw new Error("Пользователь с таким email уже существует.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                fullName,
                birthDate: new Date(birthDate),
                email,
                password: hashedPassword,
            },
        });

        return true;
    }
}

export default new AuthService();
