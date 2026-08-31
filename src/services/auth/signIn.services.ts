import prisma from "../../config/prisma.js";
import { UnAuthentication } from "../../error/error.js";
import { singInToken } from "../../utils/jwt.js";
import bcrypt from "bcrypt";
interface SignIn {
  password: string;
  user_name: string;
}
interface User {
  token: string;
  user: {
    user_id: string;
    user_name: string;
    email: string;
  };
}

export const signInServices = async (data: SignIn): Promise<User> => {
  try {
    const getAccount = await prisma.user.findFirst({
      where: {
        username: data.user_name,
      },
      select: {
        id: true,
        password: true,
        email: true,
        username: true,
      },
    });

    if (!getAccount) {
      throw new UnAuthentication("Invalid email or password");
    }
    const compare = await bcrypt.compare(data.password, getAccount.password);
    if (!compare) {
      throw new UnAuthentication("Invalid email or password");
    }
    const token = singInToken(getAccount.id);
    return {
      token,
      user: {
        user_id: getAccount.id,
        email: getAccount.email,
        user_name: getAccount.username,
      },
    };
  } catch (error) {
    throw error;
  }
};
