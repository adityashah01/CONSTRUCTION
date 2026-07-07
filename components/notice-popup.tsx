'use client'

import { useEffect, useState } from 'react'
import { X, Inbox, FileText, ImageIcon } from 'lucide-react'
import Link from 'next/link'

type Notice = {
  id: number
  type: 'text' | 'pdf' | 'image'
  title: string | null
  message: string | null
  fileName: string | null
  fileMime: string | null
  createdAt: Date
}

interface NoticePopupProps {
  notice: Notice | null
  onClose: () => void
}

export default function NoticePopup({ notice, onClose }: NoticePopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (notice) {
      setIsOpen(true)
      const timer = setTimeout(() => {
        // Don't auto-close, let user close manually
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [notice])

  if (!isOpen || !notice) return null

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-card border-2 border-red-600 rounded-lg shadow-2xl max-w-xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Inbox className="w-6 h-6" />
            <h2 className="text-xl font-bold">New Notice!</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {/* Title */}
          <div>
            <h3 className="font-bold text-lg text-foreground">
              {notice.title || 'Important Notice'}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Posted {new Date(notice.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Icon and Type */}
          <div className="flex items-center gap-2 pt-2">
            {notice.type === 'text' && (
              <>
                <Inbox className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-muted-foreground">Text Message</span>
              </>
            )}
            {notice.type === 'pdf' && (
              <>
                <FileText className="w-5 h-5 text-red-600" />
                <span className="text-sm text-muted-foreground">PDF Document</span>
              </>
            )}
            {notice.type === 'image' && (
              <>
                <ImageIcon className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-muted-foreground">Image</span>
              </>
            )}
          </div>

          {/* Message Preview */}
          {notice.type === 'text' && notice.message && (
            <div className="bg-muted p-4 rounded-lg border border-border">
              <p className="text-foreground line-clamp-3">{notice.message}</p>
            </div>
          )}

          {/* Image Preview */}
          {notice.type === 'image' && (
            <div className="rounded-lg overflow-hidden bg-muted border border-border h-auto">
              <img
                src={`/api/notices/file/${notice.id}`}
                alt="Notice"
                className="w-full h-full object-contain max-h-[60vh]"
              />
            </div>
          )}

          {/* PDF Indicator */}
          {notice.type === 'pdf' && (
            <div className="bg-muted p-4 rounded-lg border border-border text-center">
              <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-sm font-medium">{notice.fileName}</p>
              <p className="text-xs text-muted-foreground mt-1">Click below to view</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-4 flex gap-3 bg-muted">
          <Link
            href={`/notice/${notice.id}`}
            className="flex-1 bg-gradient-to-r from-red-600 to-blue-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all text-center"
            onClick={handleClose}
          >
            View Full Notice
          </Link>
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-border rounded-lg hover:bg-background transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
