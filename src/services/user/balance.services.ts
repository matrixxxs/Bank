import prisma from "../../config/prisma.js";
import { NotFound } from "../../error/error.js";

export const balanceService = async (user_id: string) => {
  const coustomer = await prisma.customer.findFirst({
    where: {
      userId: user_id,
    },
    select: {
      id: true,
    },
  });

  if (!coustomer) {
    throw new NotFound("Customer not found");
  }

  const account = await prisma.account.findFirst({
    where: {
      customerId: coustomer.id,
    },
    select: {
      id: true,
      accountNumber: true,
      balance: true,
      type: true,
    },
  });

  if (!account) {
    throw new NotFound("Account not found");
  }

  return {
    account_id: account.id,
    account_number: account.accountNumber,
    account_type: account.accountNumber,
    balance: account.balance,
  };
};
