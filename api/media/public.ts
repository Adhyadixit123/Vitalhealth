import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "../_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { section, limit } = req.query;
    const limitNumber = Math.min(Number(limit) || 50, 100);

    if (section) {
      const rows = await sql`
        SELECT id, heading, description, section, position, image_url, public_id, created_at
        FROM images
        WHERE LOWER(section) = LOWER(${section})
        ORDER BY COALESCE(position, 9999), created_at DESC
        LIMIT ${limitNumber}
      `;

      return res.status(200).json({ data: rows });
    }

    const rows = await sql`
      SELECT id, heading, description, section, position, image_url, public_id, created_at
      FROM images
      ORDER BY COALESCE(section, 'zzz'), COALESCE(position, 9999), created_at DESC
      LIMIT ${limitNumber}
    `;

    return res.status(200).json({ data: rows });
  } catch (error) {
    console.error("Failed to load public media", error);
    return res.status(500).json({ error: "Failed to load media" });
  }
}
