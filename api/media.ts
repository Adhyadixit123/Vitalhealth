import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "./_lib/db";
import { verifyAuthHeader } from "./_lib/auth";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    verifyAuthHeader(req.headers.authorization);
  } catch (error) {
    return res.status(401).json({ error: (error as Error).message || "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const rows = await sql`
        SELECT id, heading, description, section, position, image_url, public_id, created_at
        FROM images
        ORDER BY COALESCE(position, 9999), created_at DESC
      `;

      return res.status(200).json({ data: rows });
    } catch (error) {
      console.error("Failed to fetch images", error);
      return res.status(500).json({ error: "Failed to load media" });
    }
  }

  if (req.method === "POST") {
    try {
      const payload = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      const { heading, description, section, position, imageUrl, publicId } = payload as {
        heading?: string;
        description?: string;
        section?: string;
        position?: number;
        imageUrl?: string;
        publicId?: string;
      };

      if (!heading || !imageUrl) {
        return res.status(400).json({ error: "Heading and image URL are required" });
      }

      const [record] = await sql`
        INSERT INTO images (heading, description, section, position, image_url, public_id)
        VALUES (${heading}, ${description ?? null}, ${section ?? null}, ${position ?? null}, ${imageUrl}, ${publicId ?? null})
        RETURNING id, heading, description, section, position, image_url, public_id, created_at
      `;

      return res.status(201).json({ data: record });
    } catch (error) {
      console.error("Failed to create media", error);
      return res.status(500).json({ error: "Failed to create media entry" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
