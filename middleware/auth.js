import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new Error("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload in auth.js", payload);
    req.user = { userID: payload.user };
    next();
  } catch (error) {
    throw new Error("Authentication Invalid");
  }
};

export default auth;
