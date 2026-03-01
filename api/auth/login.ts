import type { VercelRequest, VercelResponse } from "@vercel/node";
import { signAdminToken, validateAdminCredentials } from "../_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { email, password } = payload as { email?: string; password?: string };

    const admin = await validateAdminCredentials(email, password);
    if (!admin) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signAdminToken(admin);
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Login error", error);
    return res.status(500).json({ error: "Login failed" });
  }
}
