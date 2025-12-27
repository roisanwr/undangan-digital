'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Crown, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client" // Import Supabase Client

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleRegister = async () => {
    setIsLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-navy/60 mix-blend-multiply z-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent z-20" />
        <img
          src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop"
          alt="Wedding Flowers"
          className="h-full w-full object-cover relative z-10"
        />
      </div>

      {/* GLASS CARD */}
      <div className="relative z-30 w-full max-w-[450px] px-6 animate-in fade-in zoom-in duration-500">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/40 rounded-full blur-3xl animate-pulse" />
        
        <div className="backdrop-blur-xl bg-black/30 border border-white/10 shadow-2xl rounded-3xl p-8 text-white">
          <div className="text-center mb-6">
             <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-gold to-yellow-700 shadow-lg shadow-gold/20 mb-4">
               <Crown className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold font-display tracking-wide text-white mb-2">Buat Akun</h1>
            <p className="text-white/70 text-sm">Mulai perjalanan undangan digitalmu</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white/90">Nama Depan</Label>
                <Input id="firstName" placeholder="Andi" className="bg-white/10 border-white/10 text-white focus-visible:ring-gold h-10 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white/90">Belakang</Label>
                <Input id="lastName" placeholder="Pratama" className="bg-white/10 border-white/10 text-white focus-visible:ring-gold h-10 rounded-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/90">Email</Label>
              <Input id="email" type="email" placeholder="nama@email.com" className="bg-white/10 border-white/10 text-white focus-visible:ring-gold h-10 rounded-xl" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  className="bg-white/10 border-white/10 text-white focus-visible:ring-gold h-10 rounded-xl pr-10" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button className="w-full bg-gold hover:bg-yellow-500 text-navy font-bold h-11 rounded-xl shadow-lg mt-2">
              Daftar Sekarang
            </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/10" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-transparent px-2 text-white/50">Atau</span></div>
            </div>

            {/* TOMBOL DAFTAR DENGAN GOOGLE */}
            <Button 
                onClick={handleGoogleRegister}
                disabled={isLoading}
                variant="outline" 
                className="w-full bg-white text-navy hover:bg-gray-100 border-none h-11 rounded-xl font-medium flex items-center gap-2"
            >
               {isLoading ? (
                 <span className="animate-spin mr-2">⏳</span>
               ) : (
                 <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.17c-.22-.66-.35-1.36-.35-2.17s.13-1.51.35-2.17V7.01H2.18c-.87 1.73-1.37 3.67-1.37 5.75s.5 4.02 1.37 5.75l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.01l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                 </svg>
               )}
               {isLoading ? "Menghubungkan..." : "Daftar dengan Google"}
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Sudah punya akun? <Link href="/login" className="text-gold font-bold hover:underline hover:text-white transition-colors">Masuk disini</Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}