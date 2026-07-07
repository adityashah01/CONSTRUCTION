import { Buffer } from "node:buffer";
import { NextRequest, NextResponse } from "next/server";
import { db, pool } from "@/lib/db";
import { notices } from "@/lib/db/schema";
import { and, desc, eq, gt } from "drizzle-orm";

// GET /api/notices            -> all notices (admin list)
// GET /api/notices?active=1   -> only currently active, non-expired notices (public)
export async function GET(req: NextRequest) {
  const activeOnly = req.nextUrl.searchParams.get("active")

  const query = activeOnly
    ? db
        .select()
        .from(notices)
        .where(and(eq(notices.active, true), gt(notices.expiresAt, new Date())))
        .orderBy(desc(notices.createdAt))
    : db
        .select()
        .from(notices)
        .orderBy(desc(notices.createdAt))

  const rows = await query

  return NextResponse.json({ notices: rows })
}

// POST /api/notices  (multipart/form-data)
// fields: type ('text' | 'pdf' | 'image'), title, message?, hours, file? (File)
export async function POST(req: NextRequest) {
  const form = await req.formData()
  const type = form.get("type") as string | null
  const title = (form.get("title") as string | null) || null
  const message = (form.get("message") as string | null) || null
  const hours = Number(form.get("hours") || 0)
  const file = form.get("file") as File | null

  if (!type || !hours || hours <= 0) {
    return NextResponse.json({ error: "Type and hours are required" }, { status: 400 })
  }
  if (type === "text" && !message) {
    return NextResponse.json({ error: "Message is required for text notices" }, { status: 400 })
  }
  if ((type === "pdf" || type === "image") && !file) {
    return NextResponse.json({ error: "File is required for PDF/image notices" }, { status: 400 })
  }

  let fileName: string | null = null
  let fileMime: string | null = null
  let fileData: Buffer | null = null

  if (file) {
    fileName = file.name
    fileMime = file.type
    const arrayBuffer = await file.arrayBuffer()
    fileData = Buffer.from(arrayBuffer)
  }

  const expiresAt = new Date(Date.now() + hours * 3600000)

  // For binary file data, we need to use raw SQL since Drizzle ORM doesn't handle binary well
  const client = await pool.connect()
  try {
    const result = await client.query(
      `INSERT INTO notices (user_id, type, title, message, file_name, file_mime, file_data, expires_at, visitor_count, active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
       RETURNING id, type, title, message, file_name, file_mime, expires_at, created_at`,
      [
        "admin",
        type,
        title || null,
        message || null,
        fileName || null,
        fileMime || null,
        fileData || null,
        expiresAt,
        0,
        true,
      ]
    )

    const noticeData = result.rows[0]

    return NextResponse.json({
      success: true,
      notice: {
        id: noticeData.id,
        type: noticeData.type,
        title: noticeData.title,
        message: noticeData.message,
        fileName: noticeData.file_name,
        fileMime: noticeData.file_mime,
        expiresAt: noticeData.expires_at,
        createdAt: noticeData.created_at,
      },
    })
  } finally {
    client.release()
  }
}
