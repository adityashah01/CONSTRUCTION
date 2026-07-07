import Link from "next/link"
import Image from "next/image"

import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-foreground to-foreground/95 text-background border-t border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden">
  <Image
    src="/Logo.jpg"   // place your logo inside /public folder
    alt="Energetic Nepal Logo"
    width={40}
    height={40}
    className="rounded-lg group-hover:scale-105 transition-transform"
  />
</div>

              <div>
                <h3 className="font-bold text-lg">Energetic Nepal</h3>
                <p className="text-xs opacity-75">Since 2008</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">Professional construction and infrastructure solutions for Nepal.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-secondary transition-colors">
                  About
                </Link>
              </li>
              <li>
              </li>
              <li>
                <Link href="/projects" className="hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="hover:text-primary transition-colors">
                  Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Construction
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Infrastructure
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Consultation
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-secondary" />
                <span>Chauni Kathmandu, Nepal</span>
              </li>
              <li className="flex gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5 text-secondary" />
                <a href="tel:+977 1-538577" className="hover:text-accent transition-colors">
                  +977 1-538577
                </a>
              </li>
              <li className="flex gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5 text-accent" />
                <a href="mailto:info@energeticnepal.com" className="hover:text-primary transition-colors">
                  info@energeticnepal.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 Energetic Nepal. All rights reserved. | Built with pride for Nepal</p>
        </div>
      </div>
    </footer>
  )
}
