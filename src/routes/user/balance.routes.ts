import { Router } from "express";
import { getBalance } from "../../controler/user/balance.controler.js";
import { authMiddleWare } from "../../middleware/auth.js";
const router = Router();

router.get("/account/balance", authMiddleWare, getBalance);

export default router;
