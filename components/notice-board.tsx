'use client'

import { useEffect, useState } from 'react'
import { FileText, ImageIcon, Inbox, Eye, Trash2, Clock, Upload, X, Search } from 'lucide-react'
import Link from 'next/link'
import NoticePopup from './notice-popup'

type Notice = {
  id: number
  type: 'text' | 'image'
  title: string | null
  message: string | null
  fileName: string | null
  fileMime: string | null
  expiresAt: Date
  visitorCount: number
  createdAt: Date
}

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([])
  const [loading, setLoading] = useState(true)
  const [latestNotice, setLatestNotice] = useState<Notice | null>(null)
  const [lastNoticeId, setLastNoticeId] = useState(0)

  // Admin states
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [password, setPassword] = useState('')
  const [adminError, setAdminError] = useState('')

  // Publish Form states
  const [type, setType] = useState<'text' | 'image'>('text')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [hours, setHours] = useState(24)
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('')
  const [publishing, setPublishing] = useState(false)

  const fetchNotices = async () => {
    try {
      const url = isAdmin ? '/api/notices' : '/api/notices?active=1'
      const response = await fetch(url)
      if (!response.ok) return;
      const json = await response.json()
      const data = json.notices || []
      const filteredData = data.filter((n: any) => n.type === 'text' || n.type === 'image')
      setNotices(filteredData)

      if (filteredData.length > 0) {
        const newest = filteredData[0]
        if (newest.id !== lastNoticeId && !isAdmin && !loading) {
          setLatestNotice(newest)
          setLastNoticeId(newest.id)
        } else if (lastNoticeId === 0) {
          setLastNoticeId(newest.id)
        }
      }
    } catch (error) {
      console.error('Failed to fetch notices:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotices()
    const interval = setInterval(fetchNotices, 10000)
    return () => clearInterval(interval)
  }, [lastNoticeId, isAdmin, loading])

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '@run123') {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setPassword('')
      setAdminError('')
    } else {
      setAdminError('Incorrect password')
    }
  }

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    setPublishing(true)
    setStatus('Publishing...')

    try {
      const formData = new FormData()
      formData.append('type', type)
      formData.append('title', title)
      if (type === 'text') formData.append('message', message)
      if (file) formData.append('file', file)
      formData.append('hours', hours.toString())

      const response = await fetch('/api/admin/notices', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setStatus('✅ Notice published successfully!')
        setTitle('')
        setMessage('')
        setFile(null)
        setType('text')
        setTimeout(() => setStatus(''), 3000)
        await fetchNotices()
      } else {
        try {
          const error = await response.json()
          setStatus(`❌ ${error.error}`)
        } catch { setStatus(`❌ Error: ${response.statusText}`) }
      }
    } catch (error) {
      setStatus('❌ Failed to publish notice')
    } finally {
      setPublishing(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      try {
        const response = await fetch(`/api/admin/notices/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          await fetchNotices()
        } else {
          alert('Failed to delete notice')
        }
      } catch (error) {
        alert('Error deleting notice')
      }
    }
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-16 px-4 flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <>
      <NoticePopup notice={latestNotice} onClose={() => setLatestNotice(null)} />
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-10 bg-card p-6 rounded-2xl shadow-sm border border-border">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              Notice Board
            </h1>
            <p className="text-muted-foreground mt-2">Latest updates and announcements</p>
          </div>
          
          <div className="relative">
            {!isAdmin ? (
              <button 
                onClick={() => setShowAdminLogin(!showAdminLogin)}
                className="p-3 bg-muted rounded-full hover:bg-red-50 hover:text-red-600 transition-colors group"
                title="Admin Access"
              >
                <Inbox className="w-6 h-6 text-muted-foreground group-hover:text-red-600 transition-colors" />
              </button>
            ) : (
              <button 
                onClick={() => setIsAdmin(false)}
                className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm font-medium hover:bg-border transition-colors"
              >
                Exit Admin
              </button>
            )}

            {/* Admin Login Dropdown */}
            {showAdminLogin && !isAdmin && (
              <div className="absolute right-0 top-14 w-72 bg-card border border-border rounded-xl shadow-xl p-5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Admin Access</h3>
                  <button onClick={() => setShowAdminLogin(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleAdminLogin} className="space-y-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
                    autoFocus
                  />
                  {adminError && <p className="text-xs text-red-600">{adminError}</p>}
                  <button type="submit" className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Login
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Admin Dashboard */}
        {isAdmin && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-lg mb-10 animate-in fade-in">
            <div className="flex items-center gap-2 mb-6">
              <Upload className="w-5 h-5 text-red-600" />
              <h2 className="text-xl font-bold">Publish New Notice</h2>
            </div>

            <form onSubmit={handlePublish} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Notice Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'text' | 'image')}
                    className="w-full border border-border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  >
                    <option value="text">Text Notice</option>
                    <option value="image">Image Notice</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter notice title"
                    required
                    className="w-full border border-border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">Show for (hours)</label>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="number"
                      min={1}
                      max={720}
                      value={hours}
                      onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
                      className="flex-1 border border-border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-red-600 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {type === 'text' ? (
                  <div className="h-full flex flex-col">
                    <label className="block text-sm font-medium mb-1.5">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type the full notice message here..."
                      required
                      className="w-full flex-1 border border-border rounded-lg px-3 py-2 bg-background focus:ring-2 focus:ring-red-600 outline-none transition-all resize-none min-h-[120px]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Upload Image</label>
                    <div className="border-2 border-dashed border-border hover:border-red-600 rounded-lg p-6 text-center transition-colors h-[120px] flex flex-col items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        required
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground font-medium">
                          {file ? file.name : 'Click to browse image'}
                        </span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="md:col-span-2 flex items-center justify-between pt-4 border-t border-border">
                <span className="text-sm font-medium text-muted-foreground">
                  {status && (
                    <span className={status.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                      {status}
                    </span>
                  )}
                </span>
                <button
                  type="submit"
                  disabled={publishing}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {publishing ? 'Publishing...' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Notices List */}
        {notices.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl border border-border shadow-sm">
            <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">No active notices at the moment.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {notices.map((notice) => (
              <div key={notice.id} className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-red-200 transition-all flex flex-col h-full">
                
                {/* Admin Delete Button Overlay */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(notice.id);
                    }}
                    className="absolute top-3 right-3 z-10 p-2 bg-red-600/90 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700 shadow-sm"
                    title="Delete Notice"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}

                <Link href={`/notice/${notice.id}`} className="flex flex-col h-full">
                  {/* Notice Visual Header (Image or Pattern) */}
                  {notice.type === 'image' ? (
                    <div className="h-48 bg-muted w-full relative overflow-hidden border-b border-border">
                      <img
                        src={`/api/notices/file/${notice.id}`}
                        alt={notice.title || 'Notice Image'}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-gradient-to-br from-red-600/10 to-blue-600/10 w-full relative flex items-center justify-center border-b border-border">
                       <FileText className="w-12 h-12 text-red-600/40" />
                    </div>
                  )}

                  {/* Content Area */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 bg-muted rounded-md text-[10px] font-semibold tracking-wider uppercase text-muted-foreground flex items-center gap-1.5">
                        {notice.type === 'image' ? <ImageIcon className="w-3 h-3" /> : <FileText className="w-3 h-3" />}
                        {notice.type}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h2 className="font-bold text-lg leading-tight mb-2 text-foreground group-hover:text-red-600 transition-colors">
                      {notice.title || 'Important Notice'}
                    </h2>

                    {notice.type === 'text' && notice.message && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                        {notice.message}
                      </p>
                    )}

                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-border">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                        <Eye className="w-4 h-4" />
                        {notice.visitorCount} views
                      </div>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider bg-background px-2 py-1 rounded border border-border">
                        Expires {new Date(notice.expiresAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
