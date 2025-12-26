'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function Home() {
  const [notes, setNotes] = useState<any[]>([])
  const [status, setStatus] = useState('Loading...')
  const [errorDetail, setErrorDetail] = useState('')
  
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      setStatus('Sedang menghubungi Supabase...')
      
      // 1. Cek Data
      const { data, error } = await supabase.from('notes').select()

      // 2. Analisa Hasil
      if (error) {
        setStatus('❌ ERROR TERJADI')
        setErrorDetail(error.message)
        console.error("Supabase Error:", error)
      } else if (data && data.length > 0) {
        setNotes(data)
        setStatus('✅ SUKSES')
      } else {
        setStatus('⚠️ KONEKSI OK, TAPI DATA KOSONG')
        setErrorDetail('Tabel "notes" tidak ditemukan atau isinya kosong. Cek SQL Editor di Supabase.')
      }
    }
    getData()
  }, [])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-12 bg-zinc-950 text-white font-mono">
      <h1 className="text-3xl font-bold mb-8">Debugger Koneksi</h1>
      
      <div className="w-full max-w-2xl p-6 border border-zinc-800 rounded-xl bg-zinc-900">
        
        {/* Status Box */}
        <div className="mb-6 pb-6 border-b border-zinc-800">
            <p className="text-gray-400 text-sm mb-1">STATUS SAAT INI:</p>
            <p className={`text-xl font-bold ${
                status.includes('SUKSES') ? 'text-green-400' : 
                status.includes('ERROR') ? 'text-red-500' : 'text-yellow-400'
            }`}>
                {status}
            </p>
            {errorDetail && (
                <p className="mt-2 text-red-400 bg-red-950/30 p-3 rounded border border-red-900 text-sm">
                    Pesan Error: {errorDetail}
                </p>
            )}
        </div>

        {/* Data Box */}
        <div>
            <p className="text-gray-400 text-sm mb-2">DATA DARI DATABASE:</p>
            {notes.length === 0 ? (
                <p className="text-zinc-600 italic">Belum ada data...</p>
            ) : (
                notes.map((note, i) => (
                    <div key={i} className="p-3 mb-2 bg-green-950/30 border border-green-900 rounded text-green-300">
                        ID: {note.id} — {note.title}
                    </div>
                ))
            )}
        </div>

      </div>
    </div>
  )
}