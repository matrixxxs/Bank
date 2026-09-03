import { Router } from "express";
import { transactionHistory } from "../../controler/user/transactionHistory.controller.js";
import { authMiddleWare } from "../../middleware/auth.js";

const router = Router();

router.get("/transactions", authMiddleWare, transactionHistory);

export default router;
