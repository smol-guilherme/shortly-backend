import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.TOKEN_SECRET;

export function tokenHandler(credentials) {
  return jwt.sign({ email: credentials.email }, SECRET, { expiresIn: "7d" });
}

export function tokenMatch(authToken) {
  try {
    const token = authToken?.replace("Bearer ", "");
    if (token && jwt.verify(token, SECRET)) {
      const email = Object.entries(jwt.verify(token, SECRET))[0];
      return email;
    }
    return true;
  } catch (err) {
    return false;
  }
}
