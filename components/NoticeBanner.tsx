"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

type NoticeData = {
  active: boolean
  id?: number
  type?: "text" | "pdf" | "image"
  title?: string | null
  message?: string | null
  fileName?: string | null
  fileMime?: string | null
  expiresAt?: string
}

export default function NoticeBanner() {
  const [notice, setNotice] = useState<NoticeData | null>(null)
  const [dismissed, setDismissed] = useState(false)

  const fetchNotice = async () => {
    try {
      const res = await fetch("/api/notice", { cache: "no-store" })
      if (!res.ok) return;
      const data: NoticeData = await res.json()
      setNotice(data)

      const dismissedKey = localStorage.getItem("dismissed-notice")
      const currentKey = `${data.id}-${data.expiresAt}`
      setDismissed(data.active ? dismissedKey === currentKey : false)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchNotice()
    const interval = setInterval(fetchNotice, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleDismiss = () => {
    if (notice) {
      localStorage.setItem("dismissed-notice", `${notice.id}-${notice.expiresAt}`)
    }
    setDismissed(true)
  }

  if (!notice || !notice.active || dismissed) return null

  const isFile = notice.type === "pdf" || notice.type === "image"
  const displayText = isFile ? notice.title || "New notice posted" : notice.message

  return (
    <div className="w-full bg-gradient-to-r from-red-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-center flex-1">
          {displayText}
          {isFile && (
            <Link href="/notice" className="underline ml-2 font-semibold">
              View notice
            </Link>
          )}
        </p>
        <button
          onClick={handleDismiss}
          aria-label="Dismiss notice"
          className="shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
