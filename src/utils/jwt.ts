import jwt from "jsonwebtoken";

const getScrete = (): string => {
  let screte = process.env.SECURE_SCRETE;
  if (!screte) {
    throw new Error("jwt_screte is not decleared");
  }
  return screte;
};
export interface TokenPayLoad {
  user_id: string;
}

export const singInToken = (user_id: string) => {
  return jwt.sign({ user_id }, getScrete(), { expiresIn: "10d" });
};

export const verifyToken = (token: string): TokenPayLoad => {
  const decode = jwt.verify(token, getScrete());
  if (typeof decode === "string") {
    throw Error("Undefined payload");
  }
  return decode as TokenPayLoad;
};
