"use client"

import { useState, useEffect } from "react"
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    
    { href: "/projects", label: "Projects" },
    { href: "/achievements", label: "Achievements" },
    { href: "/notice", label: "Notice" },
    { href: "/contact", label: "Contact" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link prefetch={true} href="/" className="flex items-center gap-3 group">
              <Image
  src="/Logo.jpg"
  alt="Energetic Nepal Logo"
  width={110}
  height={110}
  className="rounded-lg logo-hover-spin group-hover:scale-105 transition-transform"
/>

            <div className="hidden sm:block">
              <div className="font-bold text-lg text-foreground">Energetic Nepal Pvt. Ltd. </div>
              
            </div>
          </Link>
           
          

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link prefetch={true}
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-all relative group ${
                  isActive(link.href)
                    ? "text-red-600 shadow-lg shadow-red-600/50 rounded-lg bg-red-600/10"
                    : "text-foreground hover:text-red-600"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-600/20 to-blue-600/20 -z-10 blur-md"></span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-blue-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Right side - Theme toggle and CTA */}
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg bg-muted hover:bg-border transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-700" />
                )}
              </button>
            )}
      

            <Link prefetch={true}
              href="/contact"
              className="hidden sm:inline-block px-4 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow transform hover:scale-105"
            >
              Collab
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-border transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link prefetch={true}
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "bg-red-600/10 text-red-600 border border-red-600/30"
                    : "text-foreground hover:text-red-600 hover:bg-border"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link prefetch={true}
              href="/contact"
              className="block px-3 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Collab
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
