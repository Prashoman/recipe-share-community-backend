import jwt from "jsonwebtoken";

type TUserSecret = {
  id: object;
  userRole: "admin" | "user";
};

const createToken = (
  userSecret: TUserSecret,
  PrivateKey: string | Buffer,
  expiresDate: string
) => {
  const token = jwt.sign(userSecret, PrivateKey as string, {
    expiresIn: expiresDate,
  });

  return token;
};

export default createToken;
