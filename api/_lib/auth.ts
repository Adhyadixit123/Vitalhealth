import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sql } from "./db.js";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined");
}

export const validateAdminCredentials = async (email: string | undefined, password: string | undefined) => {
  if (!email || !password) {
    return false;
  }

  const rows = await sql`SELECT id, email, password_hash FROM admin_users WHERE email = ${email} LIMIT 1`;
  if (!rows.length) {
    return false;
  }

  const user = rows[0];
  const isValid = await bcrypt.compare(password, user.password_hash);
  return isValid ? { id: user.id, email: user.email } : false;
};

export const signAdminToken = (payload: { id: string; email: string }) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });

export const verifyAuthHeader = (authHeader?: string) => {
  if (!authHeader?.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.slice(7);
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("Invalid or expired token");
  }
};
