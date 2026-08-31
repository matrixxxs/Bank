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

export const singInToken = (payloas: TokenPayLoad) => {
  return jwt.sign(payloas, getScrete(), { expiresIn: "10d" });
};

const compareToken = (token: string): TokenPayLoad => {
  const decode = jwt.verify(token, getScrete());
  if (typeof decode === "string") {
    throw Error("Undefined payload");
  }
  return decode as TokenPayLoad;
};
