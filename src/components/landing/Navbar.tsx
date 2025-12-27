'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button" // Pake tombol Shadcn
import { Menu, X } from "lucide-react" // Icon Menu & Close
import { useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gold/20 shadow-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* 1. LOGO BRAND */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-dark text-gold font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              MK
            </div>
            <span className="text-2xl font-bold text-navy tracking-tight font-display">
              Momen<span className="text-gold">Kita</span>
            </span>
          </Link>

          {/* 2. MENU DESKTOP (Hidden di HP) */}
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <Link href="#" className="hover:text-gold transition-colors">Beranda</Link>
            <Link href="#" className="hover:text-gold transition-colors">Template</Link>
            <Link href="#" className="hover:text-gold transition-colors">Fitur</Link>
            <Link href="#" className="hover:text-gold transition-colors">Harga</Link>
          </div>

          {/* 3. TOMBOL ACTION (Login/Register) */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
               <Button variant="ghost" className="text-navy hover:text-gold hover:bg-cream font-semibold">
                 Masuk
               </Button>
            </Link>
            <Link href="/register">
               <Button className="bg-navy hover:bg-navy-dark text-white rounded-full px-6 shadow-lg shadow-navy/20 transition-all hover:scale-105">
                 Buat Undangan
               </Button>
            </Link>
          </div>

          {/* 4. TOMBOL MENU MOBILE (Hamburger) */}
          <button 
            className="md:hidden p-2 text-navy hover:bg-cream rounded-md transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* 5. DROPDOWN MENU MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-5">
           <div className="flex flex-col p-6 space-y-4 font-medium text-slate-600">
              <Link href="#" className="hover:text-gold">Beranda</Link>
              <Link href="#" className="hover:text-gold">Template</Link>
              <Link href="#" className="hover:text-gold">Fitur</Link>
              <Link href="#" className="hover:text-gold">Harga</Link>
              <hr className="border-gray-100" />
              <div className="grid grid-cols-2 gap-4 pt-2">
                <Link href="/login" className="w-full">
                  <Button variant="outline" className="w-full border-navy text-navy">Masuk</Button>
                </Link>
                <Link href="/register" className="w-full">
                  <Button className="w-full bg-navy text-white">Daftar</Button>
                </Link>
              </div>
           </div>
        </div>
      )}
    </nav>
  )
}