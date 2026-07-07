import { db, pool } from '@/lib/db'
import { notices } from '@/lib/db/schema'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const type = formData.get('type') as string
    const title = formData.get('title') as string
    const message = formData.get('message') as string
    const hours = parseInt(formData.get('hours') as string) || 24
    const file = formData.get('file') as File | null

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    if (type === 'text' && !message) {
      return NextResponse.json({ error: 'Message is required for text notices' }, { status: 400 })
    }

    if ((type === 'pdf' || type === 'image') && !file) {
      return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    let fileData: Buffer | null = null
    let fileName: string | null = null
    let fileMime: string | null = null

    if (file) {
      const buffer = await file.arrayBuffer()
      fileData = Buffer.from(buffer)
      fileName = file.name
      fileMime = file.type
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
          'admin',
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

      revalidatePath('/notice')
      revalidatePath('/admin/notice')

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
  } catch (error) {
    console.error('Error publishing notice:', error)
    return NextResponse.json(
      { error: 'Failed to publish notice' },
      { status: 500 }
    )
  }
}
