'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const supabase = createClient()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ type: '', text: '' })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg({ type: '', text: '' })

    // 1. Daftar ke Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        // Kirim metadata nama biar otomatis masuk tabel profiles (via Trigger)
        data: {
          full_name: formData.fullName,
        },
      },
    })

    if (error) {
      setMsg({ type: 'error', text: error.message })
      setLoading(false)
      return
    }

    // 2. Sukses! Redirect ke Login sesuai request
    setMsg({ type: 'success', text: 'Akun berhasil dibuat! Mengarahkan ke login...' })
    
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }

  // Google Login (Sama kayak login, ini otomatis handle register juga)
  const handleGoogleRegister = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/auth/callback` },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
        <h1 className="text-3xl font-bold mb-2 text-center">Buat Akun Baru</h1>
        <p className="text-gray-400 text-center mb-8">Mulai bisnis undangan digitalmu.</p>

        {msg.text && (
          <div className={`p-3 rounded mb-4 text-sm border ${
            msg.type === 'error' ? 'bg-red-900/30 text-red-400 border-red-900' : 'bg-green-900/30 text-green-400 border-green-900'
          }`}>
            {msg.text}
          </div>
        )}

        <button
          onClick={handleGoogleRegister}
          className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Daftar dengan Google
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-zinc-700"></div>
          <span className="flex-shrink mx-4 text-zinc-500 text-sm">ATAU MANUAL</span>
          <div className="flex-grow border-t border-zinc-700"></div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Nama Lengkap</label>
            <input
              type="text"
              required
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded focus:outline-none focus:border-indigo-500"
              placeholder="Contoh: Rois Digital"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded focus:outline-none focus:border-indigo-500"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input
              type="password"
              required
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded focus:outline-none focus:border-indigo-500"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? 'Sedang Mendaftar...' : 'Buat Akun'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400 text-sm">
          Sudah punya akun?{' '}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-bold">
            Login Disini
          </Link>
        </p>
      </div>
    </div>
  )
}