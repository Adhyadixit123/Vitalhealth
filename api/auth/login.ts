import type { VercelRequest, VercelResponse } from "@vercel/node";
import { signAdminToken, validateAdminCredentials } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const { email, password } = payload as { email?: string; password?: string };

  if (!validateAdminCredentials(email, password)) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signAdminToken();

  return res.status(200).json({ token });
}
