import prisma from "../../config/prisma.js";

interface CreateUser {
  first_name: string;
  middle_name: string | null;
  last_name: string;
}
interface CreateUserResponse {
  user: CreateUser;
  balance: number;
}

export const createUserService = async (
  data: CreateUser,
  user_id: string,
): Promise<CreateUserResponse> => {
  try {
    const response = await prisma.$transaction(async (tx) => {
      const result = await tx.customer.create({
        data: {
          userId: user_id,
          firstName: data.first_name,
          middleName: data.middle_name,
          lastName: data.last_name,
        },
      });
      const account = await tx.account.create({
        data: {
          customerId: result.id,
          type: "current",
          balance: 15000,
        },
      });
      await tx.transaction.create({
        data: {
          receiverAccountId: account.id,
          type: "deposit",
          amount: 15000,
          status: "completed",
        },
      });
      return {
        user: {
          first_name: result.firstName,
          middle_name: result.middleName,
          last_name: result.lastName,
        },
        balance: Number(account.balance),
      };
    });

    return response;
  } catch (error) {
    throw error;
  }
};
