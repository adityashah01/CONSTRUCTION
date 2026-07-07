import { redirect } from 'next/navigation'
import { getNoticeDetails } from '@/app/actions/notices'
import NoticeDetailView from '@/components/notice-detail-view'

export const metadata = {
  title: 'Notice Details',
  description: 'View notice details',
}

interface NoticeDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function NoticeDetailPage({ params }: NoticeDetailPageProps) {
  const { id } = await params
  const noticeId = parseInt(id)

  if (!noticeId) {
    redirect('/notice')
  }

  try {
    const notice = await getNoticeDetails(noticeId)
    return <NoticeDetailView notice={notice as any} />
  } catch (error) {
    redirect('/notice')
  }
}
