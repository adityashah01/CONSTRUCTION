"use client"

import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import NoticeBanner from "@/components/NoticeBanner"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ScrollToTop />
      <NoticeBanner />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </ThemeProvider>
  )
}
