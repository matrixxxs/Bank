import express from "express";
import { transfer } from "../../controler/user/transfer.controler.js";
import { authMiddleWare } from "../../middleware/auth.js";
const router = express.Router();

router.post("/transfer", authMiddleWare, transfer);

export default router;
