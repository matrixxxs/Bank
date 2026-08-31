import prisma from "../../config/prisma.js";
import bcrypt from "bcrypt";
import { Prisma } from "../../generated/prisma/client.js";
const SaltRound = 10;
interface signUp {
  user_name: string;
  bvn: string;
  email: string;
  password: string;
}

export const signInServices = async (data: signUp) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, SaltRound);

    const create = await prisma.user.create({
      data: {
        username: data.user_name,
        bvn: data.bvn,
        email: data.email,
        password: hashedPassword,
      },
    });

    return create;
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("User already exists");
      }
    }

    throw error;
  }
};
