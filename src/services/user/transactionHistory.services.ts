import prisma from "../../config/prisma.js";
import { NotFound } from "../../error/error.js";

export const transactionHistoryService = async (user_id: string) => {
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
    },
  });

  if (!account) {
    throw new NotFound("Account not found");
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      accountId: account.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      amount: true,
      type: true,
      createdAt: true,
    },
  });

  return transactions;
};
