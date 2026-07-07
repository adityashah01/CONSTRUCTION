import { NextRequest, NextResponse } from "next/server"
import { db, pool } from "@/lib/db"
import { visitors } from "@/lib/db/schema"

// GET /api/visitors -> logs a visit and increments total visitor count
export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") || "/"
  
  try {
    // Log the individual visit
    await db.insert(visitors).values({
      path,
      visitedAt: new Date(),
    })

    // Increment total visitor count using raw SQL for efficiency
    const client = await pool.connect()
    try {
      await client.query(
        `UPDATE public.visitor_stats SET total_visitors = total_visitors + 1, last_visit = NOW(), updated_at = NOW() WHERE id = 1`
      )

      // Get current visitor count
      const result = await client.query('SELECT total_visitors FROM public.visitor_stats WHERE id = 1')
      const totalCount = result.rows[0]?.total_visitors ?? 0

      return NextResponse.json({ visitors: totalCount })
    } finally {
      client.release()
    }
  } catch (error: any) {
    console.error('[v0] Error tracking visitor:', error)
    return NextResponse.json({ visitors: 0, error: 'Failed to track visitor', message: error.message, stack: error.stack }, { status: 500 })
  }
}
