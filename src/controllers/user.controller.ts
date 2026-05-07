import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
    static async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const id = req.params.id as string;

            const user = await UserService.getUserById(id);

            return res.json(user);
        } catch (err) {
            return res.status(404).json({
                message: err instanceof Error ? err.message : "Unknown error",
            });
        }
    }

    static async getAllUsers(req: Request, res: Response): Promise<Response> {
        try {
            const users = await UserService.getAllUsers();

            return res.json(users);
        } catch (err) {
            return res.status(500).json({
                message: err instanceof Error ? err.message : "Unknown error",
            });
        }
    }

    static async toggleBlockUser(
        req: Request,
        res: Response,
    ): Promise<Response> {
        try {
            const id = req.params.id as string;

            const user = await UserService.toggleBlockUser(id);

            return res.json(user);
        } catch (err) {
            return res.status(500).json({
                message: err instanceof Error ? err.message : "Unknown error",
            });
        }
    }
}

export default new UserController();
