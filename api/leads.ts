import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "./_lib/db";
import { verifyAuthHeader } from "./_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      verifyAuthHeader(req.headers.authorization);
      const leads = await sql`SELECT * FROM leads ORDER BY created_at DESC LIMIT 200`;
      return res.status(200).json({ data: leads });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch leads";
      const status = message.includes("Unauthorized") ? 401 : 500;
      return res.status(status).json({ error: message });
    }
  }

  if (req.method === "POST") {
    const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    const { fullName, email, phone, role, message } = payload as {
      fullName?: string;
      email?: string;
      phone?: string;
      role?: string;
      message?: string;
    };

    if (!fullName || !email) {
      return res.status(400).json({ error: "Full name and email are required" });
    }

    try {
      const result = await sql`
        INSERT INTO leads (full_name, email, phone, role, message)
        VALUES (${fullName}, ${email}, ${phone || null}, ${role || null}, ${message || null})
        RETURNING *
      `;
      return res.status(201).json({ data: result[0] });
    } catch (error) {
      console.error("Failed to create lead", error);
      return res.status(500).json({ error: "Failed to create lead" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
