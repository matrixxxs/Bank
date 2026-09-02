import { ValidateBody } from "../../middleware/validate.js";
import { createUser } from "../../controler/user/create.controler.js";
import { createUserSchema } from "../../schema/user/create.schema.js";
import express from "express";

const router = express.Router();

router.post(
  "/account/create",
  ValidateBody(createUserSchema as any),
  createUser,
);

export default router;
