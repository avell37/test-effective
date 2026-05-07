import { LoginData, RegisterData } from "../types/auth.types";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    static async login(data: LoginData): Promise<string> {
        const { email, password } = data;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new Error("Пользователь с таким email не найден.");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Неверный пароль.");
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" },
        );

        return token;
    }
}

export default new AuthService();
