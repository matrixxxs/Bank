import { ValidateBody } from "../../middleware/validate.js";
import { createUser } from "../../controler/user/create.controler.js";
import { createUserSchema } from "../../schema/user/create.schema.js";
import { authMiddleWare } from "../../middleware/auth.js";
import express from "express";

const router = express.Router();

router.post("/account/create", authMiddleWare, createUser);

export default router;
