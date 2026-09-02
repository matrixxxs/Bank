import { signIn } from "../../controler/auth/signIn.controler.js";
import { signUP } from "../../controler/auth/signUp.controler.js";
import express from "express";
const router = express.Router();

router.post("/jjj", signIn);
router.post("/jjj", signUP);

export default router;
