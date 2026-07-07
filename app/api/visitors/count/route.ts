import { db, pool } from "@/lib/db"

// GET /api/visitors/count -> total visitor count, without logging a new visit
export async function GET() {
  try {
    const client = await pool.connect();
    let count = 0;
    try {
      const result = await client.query('SELECT total_visitors FROM visitor_stats WHERE id = 1');
      if (result.rows[0]) {
        count = result.rows[0].total_visitors;
      }
    } finally {
      client.release();
    }
    return Response.json({ visitors: count })
  } catch (error) {
    console.error("[v0] Error fetching visitor count:", error)
    return Response.json({ visitors: 0 })
  }
}
