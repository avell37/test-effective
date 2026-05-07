import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { selfOrAdminMiddlware } from "../middleware/self-or-admin.middleware";
import { UserController } from "../controllers/user.controller";
import { roleMiddleware } from "../middleware/role.middleware";

const router = Router();

router.get(
    "/:id",
    authMiddleware,
    selfOrAdminMiddlware,
    UserController.getUserById,
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    UserController.getAllUsers,
);

router.patch(
    "/:id/block",
    authMiddleware,
    selfOrAdminMiddlware,
    UserController.toggleBlockUser,
);

export default router;
