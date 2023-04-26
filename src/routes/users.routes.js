import { Router } from "express";
import { userRegister, userLogin } from "../utils/controllers/users.controllers.js";

const router = Router()

router.post("/user/register", userRegister)
router.post("/user/login", userLogin)
router.get("/")

export default router