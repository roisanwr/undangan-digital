import { createClient } from "@/utils/supabase/server"
import { redirect, notFound } from "next/navigation"
import InvitationEditor from "@/components/editor/InvitationEditor"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Interface buat nangkep parameter URL
interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EditorPage(props: PageProps) {
  // 1. Tangkap ID dari URL (Wajib await di Next.js terbaru)
  const params = await props.params
  const id = params.id
  
  // 2. Setup Supabase Server
  const supabase = await createClient()

  // 3. Cek Login
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // 4. Ambil Data Undangan dari Database
  const { data: invitation, error } = await supabase
    .from("invitations")
    .select("*")
    .eq("id", id)
    .single()

  // 5. Kalau data gak ketemu atau error -> 404 Not Found
  if (error || !invitation) {
    return notFound()
  }

  // 6. Kalau ketemu, tampilkan Editor
  return (
    <div className="pb-20">
      {/* Tombol Kembali kecil di atas */}
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-slate-500 hover:text-navy flex items-center gap-1 w-fit">
             <ArrowLeft size={14} /> Kembali ke Dashboard
        </Link>
      </div>

      {/* Panggil Komponen Editor (Client) dan kirim datanya */}
      <InvitationEditor invitation={invitation} />
    </div>
  )
}