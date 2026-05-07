import { Request } from "express";
import { registerSchema } from "../validators/auth.validator";
import { AuthService } from "../services/auth.service";

export class AuthController {
    static async register(req: Request): Promise<boolean> {
        try {
            const validatedData = registerSchema.parse(req.body);

            await AuthService.register(validatedData);

            return true;
        } catch (err) {
            throw new Error(`Ошибка при регистрации пользователя: ${err}`);
        }
    }
}

export default new AuthController();
