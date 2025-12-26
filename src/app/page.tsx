import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8 text-center">
      
      {/* Hero Section */}
      <div className="max-w-2xl space-y-6">
        <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900 text-sm text-zinc-400 mb-4">
          ✨ Platform Undangan Digital No.1
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
          Buat Undangan Pernikahan Impian.
        </h1>
        
        <p className="text-xl text-zinc-400">
          Tanpa coding. Tanpa ribet. Fitur lengkap dengan manajemen tamu otomatis & RSVP real-time.
        </p>

        {/* Tombol Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link 
            href="/login"
            className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition"
          >
            Masuk Dashboard
          </Link>
          
          <Link 
            href="/register"
            className="px-8 py-3 rounded-full border border-zinc-700 hover:bg-zinc-900 transition"
          >
            Daftar Gratis
          </Link>
        </div>
      </div>

      {/* Footer simple */}
      <div className="absolute bottom-8 text-zinc-600 text-sm">
        &copy; 2025 Undangan Digital SaaS. All rights reserved.
      </div>
    </main>
  )
}