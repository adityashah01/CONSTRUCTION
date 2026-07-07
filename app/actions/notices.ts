'use server'

import { db } from '@/lib/db'
import { notices, visitors } from '@/lib/db/schema'
import { and, desc, eq, gt, lt, sql } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'

async function getUserId() {
  // For admin operations, use 'admin' as the userId
  // In a full auth setup, this would get the actual user ID from session
  return 'admin'
}

export async function publishNotice(
  title: string,
  message: string,
  expiresAt: Date,
  fileDataBase64?: string,
  fileName?: string,
  fileMime?: string,
  type: 'text' | 'pdf' | 'image' = 'text'
) {
  // Always use raw SQL to handle binary data and avoid schema mismatch
  const { pool } = await import('@/lib/db')
  const client = await pool.connect()
  try {
    const fileData = fileDataBase64 ? Buffer.from(fileDataBase64, 'base64') : null;
    const result = await client.query(
      `INSERT INTO notices (user_id, type, title, message, file_name, file_mime, file_data, expires_at, visitor_count, active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW())
       RETURNING id, type, title, message, file_name, file_mime, expires_at, created_at`,
      [
        'admin',
        type,
        title || null,
        message || null,
        fileName || null,
        fileMime || null,
        fileData,
        expiresAt,
        0,
        true,
      ]
    )

    const noticeData = result.rows[0]

    revalidatePath('/notice')
    revalidatePath('/admin/notice')

    return {
      id: noticeData.id,
      type: noticeData.type,
      title: noticeData.title,
      message: noticeData.message,
      fileName: noticeData.file_name,
      fileMime: noticeData.file_mime,
      expiresAt: noticeData.expires_at,
      createdAt: noticeData.created_at,
      userId: 'admin',
      visitorCount: 0,
      active: true,
    }
  } finally {
    client.release()
  }
}

export async function getPublishedNotices() {
  const now = new Date()

  // Get all active notices that haven't expired
  const activeNotices = await db
    .select()
    .from(notices)
    .where(and(eq(notices.active, true), gt(notices.expiresAt, now)))
    .orderBy(desc(notices.createdAt))

  return activeNotices
}

export async function getMyNotices() {
  const userId = await getUserId()

  const myNotices = await db
    .select()
    .from(notices)
    .where(eq(notices.userId, userId))
    .orderBy(desc(notices.createdAt))

  return myNotices
}

export async function getNoticeDetails(noticeId: number) {
  const userId = await getUserId()

  const notice = await db
    .select()
    .from(notices)
    .where(eq(notices.id, noticeId))
    .limit(1)

  if (!notice.length) throw new Error('Notice not found')

  // Track visitor
  const headersList = await headers()
  const ipAddress = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  const userAgent = headersList.get('user-agent') || 'unknown'

  await db.insert(visitors).values({
    noticeId,
    userId: userId,
    ipAddress,
    userAgent,
  })

  // Increment visitor count
  await db
    .update(notices)
    .set({ visitorCount: sql`${notices.visitorCount} + 1` })
    .where(eq(notices.id, noticeId))

  revalidatePath(`/notice/${noticeId}`)

  return notice[0]
}

export async function updateNotice(
  noticeId: number,
  title: string,
  message: string,
  expiresAt: Date,
  fileDataBase64?: string,
  fileName?: string,
  fileMime?: string,
  type?: 'text' | 'pdf' | 'image'
) {
  const userId = await getUserId()

  // Verify ownership
  const notice = await db
    .select()
    .from(notices)
    .where(and(eq(notices.id, noticeId), eq(notices.userId, userId)))
    .limit(1)

  if (!notice.length) throw new Error('Not authorized')

  const fileData = fileDataBase64 ? Buffer.from(fileDataBase64, 'base64') : undefined;

  const result = await db
    .update(notices)
    .set({
      type: type || notice[0].type,
      title: title || notice[0].title,
      message: message || notice[0].message,
      fileName: fileName || notice[0].fileName,
      fileMime: fileMime || notice[0].fileMime,
      fileData: fileData || notice[0].fileData,
      expiresAt,
      updatedAt: new Date(),
    })
    .where(eq(notices.id, noticeId))
    .returning()

  revalidatePath('/notice')
  revalidatePath('/admin/notice')
  return result[0]
}

export async function deleteNotice(noticeId: number) {
  const userId = await getUserId()

  // Verify ownership
  const notice = await db
    .select()
    .from(notices)
    .where(and(eq(notices.id, noticeId), eq(notices.userId, userId)))
    .limit(1)

  if (!notice.length) throw new Error('Not authorized')

  await db.delete(notices).where(eq(notices.id, noticeId))
  await db.delete(visitors).where(eq(visitors.noticeId, noticeId))

  revalidatePath('/notice')
  revalidatePath('/admin/notice')
}

export async function getNoticeVisitors(noticeId: number) {
  const userId = await getUserId()

  // Verify ownership
  const notice = await db
    .select()
    .from(notices)
    .where(and(eq(notices.id, noticeId), eq(notices.userId, userId)))
    .limit(1)

  if (!notice.length) throw new Error('Not authorized')

  const visitorList = await db
    .select()
    .from(visitors)
    .where(eq(visitors.noticeId, noticeId))
    .orderBy(desc(visitors.viewedAt))

  return visitorList
}

export async function deactivateExpiredNotices() {
  const now = new Date()

  await db
    .update(notices)
    .set({ active: false })
    .where(and(eq(notices.active, true), lt(notices.expiresAt, now)))

  revalidatePath('/notice')
  revalidatePath('/admin/notice')
}
