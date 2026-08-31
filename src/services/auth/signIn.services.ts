import prisma from "../../config/prisma.js";

import { Prisma } from "../../generated/prisma/client.js";

interface signIn {
  user_name: string;
  bvn: string;
  email: string;
  password: string;
}

export const signInServices = async (data: signIn) => {
  try {
    const create = await prisma.user.create({
      data: {
        username: data.user_name,
        bvn: data.bvn,
        email: data.email,
        password: data.password,
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
