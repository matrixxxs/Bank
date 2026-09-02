import { signIn } from "../../controler/auth/signIn.controler.js";
import { signUP } from "../../controler/auth/signUp.controler.js";
import { authMiddleWare } from "../../middleware/auth.js";
import express from "express";
const router = express.Router();

router.post("/signIn", signIn);
router.post("/signUp", signUP);

export default router;
