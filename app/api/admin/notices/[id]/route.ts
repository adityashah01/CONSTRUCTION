import { db } from '@/lib/db'
import { notices } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idParam } = await params
    const noticeId = parseInt(idParam)

    if (!noticeId) {
      return NextResponse.json({ error: 'Invalid notice ID' }, { status: 400 })
    }

    await db.delete(notices).where(eq(notices.id, noticeId))

    revalidatePath('/notice')
    revalidatePath('/admin/notice')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting notice:', error)
    return NextResponse.json(
      { error: 'Failed to delete notice' },
      { status: 500 }
    )
  }
}
