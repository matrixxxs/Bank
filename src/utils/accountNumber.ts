import crypto from "crypto";

export const generateAccountNumber = (): string => {
  return crypto.randomInt(1000000000, 10000000000).toString();
};
