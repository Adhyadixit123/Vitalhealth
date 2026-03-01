import jwt from "jsonwebtoken";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
  throw new Error("ADMIN_EMAIL, ADMIN_PASSWORD, and JWT_SECRET must be defined");
}

export const validateAdminCredentials = (email: string | undefined, password: string | undefined) =>
  email === ADMIN_EMAIL && password === ADMIN_PASSWORD;

export const signAdminToken = () => jwt.sign({ email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: "12h" });

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
