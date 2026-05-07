import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async register(req: Request, res: Response): Promise<Response> {
        try {
            const validatedData = registerSchema.parse(req.body);

            await AuthService.register(validatedData);

            return res
                .status(201)
                .json({ message: "Пользователь успешно зарегистрирован" });
        } catch (err) {
            return res.status(404).json({
                message: err instanceof Error ? err.message : "Unknown error",
            });
        }
    }

    static async login(req: Request, res: Response): Promise<Response> {
        try {
            const validatedData = loginSchema.parse(req.body);

            const token = await AuthService.login(validatedData);

            return res.status(200).json({ token });
        } catch (err) {
            return res.status(404).json({
                message: err instanceof Error ? err.message : "Unknown error",
            });
        }
    }
}

export default new AuthController();
