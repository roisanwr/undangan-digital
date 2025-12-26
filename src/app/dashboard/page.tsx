import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Ini Halaman Server Component (Lebih aman buat cek session)
export default async function DashboardPage() {
  
  // 1. Cek apakah user sudah login?
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // 2. Kalau belum login, tendang ke halaman login
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Pengantin</h1>
            <p className="text-zinc-400">Selamat datang, {user.email}</p>
          </div>
          
          {/* Tombol Logout (Pake form action biar simple) */}
          <form action="/auth/signout" method="post">
             <button className="px-4 py-2 bg-red-900/30 text-red-400 border border-red-900 rounded hover:bg-red-900/50 transition text-sm">
                Logout
             </button>
          </form>
        </div>

        {/* Area Konten */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-lg font-bold mb-2">Total Undangan</h3>
            <p className="text-3xl font-mono text-indigo-400">0</p>
          </div>
          
          {/* Card 2 */}
          <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
            <h3 className="text-lg font-bold mb-2">Paket Saat Ini</h3>
            <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-xs border border-green-900">
              FREE TIER
            </span>
          </div>

           {/* Card 3: Create New */}
           <div className="p-6 rounded-xl border border-dashed border-zinc-700 flex items-center justify-center cursor-pointer hover:bg-zinc-900/50 transition group">
            <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition">➕</div>
                <p className="text-zinc-400 text-sm">Buat Undangan Baru</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}