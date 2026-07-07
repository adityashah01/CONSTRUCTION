import { db } from "@/lib/db"
import { notices } from "@/lib/db/schema"
import { and, desc, eq, gt } from "drizzle-orm"
import { NextResponse } from "next/server"

// GET /api/notice -> the single most recent active notice (used by the top banner)
export async function GET() {
  const notice = await db
    .select({
      id: notices.id,
      type: notices.type,
      title: notices.title,
      message: notices.message,
      fileName: notices.fileName,
      fileMime: notices.fileMime,
      expiresAt: notices.expiresAt,
    })
    .from(notices)
    .where(and(eq(notices.active, true), gt(notices.expiresAt, new Date())))
    .orderBy(desc(notices.createdAt))
    .limit(1)

  if (!notice.length) {
    return NextResponse.json({ active: false })
  }

  return NextResponse.json({
    active: true,
    id: notice[0].id,
    type: notice[0].type,
    title: notice[0].title,
    message: notice[0].message,
    fileName: notice[0].fileName,
    fileMime: notice[0].fileMime,
    expiresAt: notice[0].expiresAt,
  })
}
