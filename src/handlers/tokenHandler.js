import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.TOKEN_SECRET;

export default function tokenHandler(credentials) {
  return jwt.sign( { email: credentials.email }, SECRET, { expiresIn: "7d" } );
}