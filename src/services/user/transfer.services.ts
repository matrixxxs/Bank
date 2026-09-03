import prisma from "../../config/prisma.js";
import { BadRequest, NotFound } from "../../error/error.js";

interface TransferInput {
  account_number: string;
  amount: number;
}

interface TransactionSlip {
  transaction_id: string;

  sender: {
    name: string;
    account_number: string;
  };

  receiver: {
    name: string;
    account_number: string;
  };

  amount: number;
  type: string;
  status: string;
  date: Date;
}

export const transferService = async (
  data: TransferInput,
  user_id: string,
): Promise<TransactionSlip> => {
  // Find the sender's customer
  const customer = await prisma.customer.findFirst({
    where: {
      userId: user_id,
    },
    select: {
      id: true,
    },
  });

  if (!customer) {
    throw new NotFound("Customer does not exist");
  }

  const slip = await prisma.$transaction(async (tx) => {
    // Find sender's account
    const senderAccount = await tx.account.findFirst({
      where: {
        customerId: customer.id,
      },
      include: {
        customer: true,
      },
    });

    if (!senderAccount) {
      throw new NotFound("Sender account does not exist");
    }

    // Find receiver's account
    const receiverAccount = await tx.account.findUnique({
      where: {
        accountNumber: data.account_number,
      },
      include: {
        customer: true,
      },
    });

    if (!receiverAccount) {
      throw new NotFound("Receiver account does not exist");
    }

    // Prevent transferring to yourself
    if (senderAccount.id === receiverAccount.id) {
      throw new BadRequest("You cannot transfer to yourself");
    }

    // Check amount
    if (data.amount <= 0) {
      throw new BadRequest("Transfer amount must be greater than zero");
    }

    // Check sender's balance
    if (Number(senderAccount.balance) < data.amount) {
      throw new BadRequest("Insufficient balance");
    }

    // Deduct money from sender
    await tx.account.update({
      where: {
        id: senderAccount.id,
      },
      data: {
        balance: {
          decrement: data.amount,
        },
      },
    });

    // Add money to receiver
    await tx.account.update({
      where: {
        id: receiverAccount.id,
      },
      data: {
        balance: {
          increment: data.amount,
        },
      },
    });

    // Create transaction record
    const transaction = await tx.transaction.create({
      data: {
        senderAccountId: senderAccount.id,
        receiverAccountId: receiverAccount.id,
        amount: data.amount,
        type: "transfer",
        status: "completed",
      },
    });

    // Return transaction slip
    return {
      transaction_id: transaction.id,

      sender: {
        name: `${senderAccount.customer.firstName} ${senderAccount.customer.lastName}`,
        account_number: senderAccount.accountNumber,
      },

      receiver: {
        name: `${receiverAccount.customer.firstName} ${receiverAccount.customer.lastName}`,
        account_number: receiverAccount.accountNumber,
      },

      amount: Number(transaction.amount),
      type: transaction.type,
      status: transaction.status,
      date: transaction.createdAt,
    };
  });

  return slip;
};
