import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Users, MailOpen, CalendarHeart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Ambil User Login (Auth)
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // 2. Ambil Data Profile (Database)
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  // 🛡️ YUI FIX: SAFE FALLBACK
  // Kalau profile di database kosong (null), kita pake data dari Auth sementara
  const userData = profile || {
    full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || "Pengguna",
    role: "user" // Default role
  }

  // 3. LOGIKA ADMIN VS USER
  if (userData.role === "admin") {
    return <AdminDashboardView user={userData} />
  } else {
    // Kalau User Biasa, kita perlu ambil data undangannya
    const { data: invitations } = await supabase
      .from("invitations")
      .select("*")
      .eq("user_id", user.id)

    return <UserDashboardView user={userData} invitations={invitations || []} />
  }
}

// ==========================================
// 🅰️ TAMPILAN ADMIN
// ==========================================
function AdminDashboardView({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-navy font-display">Admin Panel</h2>
          <p className="text-slate-500">Selamat datang kembali, Bos {user.full_name}!</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-navy/10 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total User</CardTitle>
            <Users className="h-4 w-4 text-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">--</div>
            <p className="text-xs text-slate-400">Data belum terhubung</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="p-10 border-2 border-dashed border-slate-200 rounded-xl text-center">
        <p className="text-slate-400">Fitur Admin Lengkap akan kita bangun nanti ya! Fokus ke User dulu. 🚧</p>
      </div>
    </div>
  )
}

// ==========================================
// 🅱️ TAMPILAN USER (PENGANTIN)
// ==========================================
function UserDashboardView({ user, invitations }: { user: any, invitations: any[] }) {
  const hasInvitation = invitations.length > 0
  
  // Ambil nama depan saja biar akrab
  // Pake Optional Chaining (?.) biar gak crash kalo nama kosong
  const firstName = user.full_name?.split(' ')[0] || "Kak"

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-navy font-display">
            Halo, {firstName}! 👋
          </h2>
          <p className="text-slate-500">Siap menyebarkan kabar bahagiamu hari ini?</p>
        </div>
        
        {/* Tombol Buat Undangan (Hanya muncul kalau udah punya undangan) */}
        {hasInvitation && (
             <Link href="/dashboard/invitations/create">
               <Button className="bg-navy hover:bg-navy-dark text-white shadow-lg">
                  <Plus className="mr-2 h-4 w-4" /> Buat Undangan Baru
               </Button>
             </Link>
        )}
      </div>

      {/* KONTEN UTAMA */}
      {!hasInvitation ? (
        // 1. EMPTY STATE
        <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-navy/20 rounded-2xl bg-white/50 p-8 text-center animate-in fade-in zoom-in duration-500">
           <div className="bg-gold/10 p-4 rounded-full mb-4">
              <CalendarHeart className="h-10 w-10 text-gold" />
           </div>
           <h3 className="text-xl font-bold text-navy mb-2">Belum ada undangan</h3>
           <p className="text-slate-500 max-w-md mb-6">
             Kamu belum membuat undangan pernikahan. Yuk mulai buat undangan digitalmu sekarang, gratis dan mudah!
           </p>
           <Link href="/dashboard/invitations/create">
             <Button size="lg" className="bg-gradient-to-r from-navy to-navy-dark hover:shadow-xl transition-all hover:-translate-y-1">
                <Plus className="mr-2 h-5 w-5" /> Buat Undangan Pertamaku
             </Button>
           </Link>
        </div>
      ) : (
        // 2. LIST UNDANGAN
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           {invitations.map((inv) => (
             <Card key={inv.id} className="group overflow-hidden border-navy/10 hover:shadow-xl transition-all duration-300 hover:border-gold/50">
                {/* Cover Image Placeholder */}
                <div className="h-40 bg-slate-100 relative">
                   {inv.cover_image ? (
                     <img src={inv.cover_image} alt="Cover" className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full flex items-center justify-center bg-navy/5 text-navy/20">
                        <MailOpen className="h-10 w-10" />
                     </div>
                   )}
                   <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-navy shadow-sm">
                      {inv.is_active ? "PUBLISHED" : "DRAFT"}
                   </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-lg font-display text-navy truncate">
                    {inv.slug || "Undangan Tanpa Judul"}
                  </CardTitle>
                  <p className="text-xs text-slate-400">Dibuat: {new Date(inv.created_at).toLocaleDateString("id-ID")}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/invitations/${inv.id}`} className="w-full">
                       <Button variant="outline" className="w-full border-navy/20 hover:bg-navy hover:text-white">
                          Edit Undangan
                       </Button>
                    </Link>
                  </div>
                </CardContent>
             </Card>
           ))}
        </div>
      )}
    </div>
  )
}