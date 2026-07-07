import { db } from '@/lib/db'
import { notices } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const noticeId = parseInt(idParam)

    if (!noticeId) {
      return NextResponse.json({ error: 'Invalid notice ID' }, { status: 400 })
    }

    const notice = await db
      .select({
        id: notices.id,
        type: notices.type,
        title: notices.title,
        message: notices.message,
        fileName: notices.fileName,
        visitorCount: notices.visitorCount,
        expiresAt: notices.expiresAt,
        createdAt: notices.createdAt,
      })
      .from(notices)
      .where(eq(notices.id, noticeId))
      .limit(1)

    if (!notice.length) {
      return NextResponse.json({ error: 'Notice not found' }, { status: 404 })
    }

    return NextResponse.json(notice[0])
  } catch (error) {
    console.error('Error fetching notice:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
