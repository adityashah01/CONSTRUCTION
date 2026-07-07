import { pool } from '@/lib/db'
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

    // Use raw SQL to retrieve binary file data
    const client = await pool.connect()
    try {
      const result = await client.query(
        'SELECT file_data, file_mime, file_name FROM notices WHERE id = $1',
        [noticeId]
      )

      if (!result.rows.length || !result.rows[0].file_data) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 })
      }

      const fileData = result.rows[0].file_data
      const mimeType = result.rows[0].file_mime || 'application/octet-stream'
      const fileName = result.rows[0].file_name || `notice-${noticeId}`

      return new NextResponse(fileData, {
        headers: {
          'Content-Type': mimeType,
          'Content-Disposition': `inline; filename="${fileName}"`,
          'Cache-Control': 'public, max-age=3600',
        },
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error serving file:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
