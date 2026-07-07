'use client'

import { FileText, ImageIcon, Inbox, ArrowLeft, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'

type Notice = {
  id: number
  type: 'text' | 'pdf' | 'image'
  title: string | null
  message: string | null
  fileName: string | null
  expiresAt: Date
  visitorCount: number
  createdAt: Date
}

interface NoticeDetailViewProps {
  notice: Notice
}

export default function NoticeDetailView({ notice }: NoticeDetailViewProps) {
  const isExpired = new Date(notice.expiresAt) <= new Date()

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto py-8 px-4">
        {/* Back Button */}
        <Link
          href="/notice"
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Notice Board
        </Link>

        {/* Main Card */}
        <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
          {/* Header */}
          <div className={`p-8 ${isExpired ? 'bg-red-50 border-b-2 border-red-200' : 'bg-gradient-to-r from-red-600 to-blue-600'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  {notice.type === 'pdf' && (
                    <FileText className="w-8 h-8 text-red-600" />
                  )}
                  {notice.type === 'image' && (
                    <ImageIcon className="w-8 h-8 text-purple-600" />
                  )}
                  {notice.type === 'text' && (
                    <Inbox className={`w-8 h-8 ${isExpired ? 'text-red-600' : 'text-white'}`} />
                  )}
                  <h1 className={`text-3xl font-bold ${isExpired ? 'text-red-700' : 'text-white'}`}>
                    {notice.title || 'Notice'}
                  </h1>
                </div>

                {isExpired && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-200 text-red-800 rounded-full text-sm font-medium">
                    Expired
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Metadata */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
                <Eye className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Views</p>
                  <p className="text-lg font-semibold">{notice.visitorCount}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Posted</p>
                  <p className="text-sm font-semibold">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
                <Calendar className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Expires</p>
                  <p className="text-sm font-semibold">
                    {new Date(notice.expiresAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Text Content */}
            {notice.type === 'text' && notice.message && (
              <div className="space-y-3 p-6 bg-muted rounded-lg border border-border">
                <h2 className="font-semibold text-lg">Message</h2>
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {notice.message}
                </p>
              </div>
            )}

            {/* Image Content */}
            {notice.type === 'image' && (
              <div className="space-y-3">
                <h2 className="font-semibold text-lg">Image</h2>
                <div className="rounded-lg overflow-hidden border-2 border-border bg-muted">
                  <a href={`/api/notices/file/${notice.id}`} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`/api/notices/file/${notice.id}`}
                      alt={notice.title || 'Notice image'}
                      className="w-full h-auto cursor-pointer hover:opacity-95 transition-opacity"
                      title="Click to view full size"
                    />
                  </a>
                </div>
              </div>
            )}

            {/* PDF Content */}
            {notice.type === 'pdf' && (
              <div className="space-y-3 p-6 bg-muted rounded-lg border-2 border-red-600/20">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-red-600" />
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{notice.fileName || 'PDF Document'}</p>
                    <p className="text-sm text-muted-foreground">Click below to view the document</p>
                  </div>
                </div>

                <a
                  href={`/api/notices/file/${notice.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all mt-4"
                >
                  <FileText className="w-5 h-5" />
                  Open PDF Document
                </a>
              </div>
            )}

            {/* Time Info */}
            <div className="pt-4 border-t text-center text-sm text-muted-foreground">
              <p>
                Posted {new Date(notice.createdAt).toLocaleString()} · 
                {isExpired ? ' This notice has expired' : ` Expires ${new Date(notice.expiresAt).toLocaleString()}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
