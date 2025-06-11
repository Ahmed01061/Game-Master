import jwt from "jsonwebtoken";

export default (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EPIRES_IN || "1h",
  });
  return token;
};
