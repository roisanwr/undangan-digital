'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

// 1. DATA TEMPLATE DUMMY (Nanti ini bisa dari database)
const templates = [
  {
    id: "luxury-gold",
    name: "Royal Golden",
    category: "Premium",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
    description: "Nuansa emas elegan untuk pernikahan mewah di gedung.",
    colors: ["#D4AF37", "#1A1A1A"]
  },
  {
    id: "floral-romantic",
    name: "Pinky Floral",
    category: "Free",
    image: "https://images.unsplash.com/photo-1519225468359-2996bc01c083?q=80&w=800&auto=format&fit=crop",
    description: "Sentuhan bunga lembut untuk acara outdoor atau intimate.",
    colors: ["#FFC0CB", "#FFFFFF"]
  },
  {
    id: "minimalist-clean",
    name: "Simply White",
    category: "Free",
    image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
    description: "Desain bersih dan modern tanpa banyak ornamen.",
    colors: ["#F8F8F8", "#333333"]
  }
]

export default function CreateInvitationPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<string | null>(null) // Simpan ID template yg lagi loading

  // 2. FUNGSI MAGIC: PILIH TEMPLATE -> BIKIN UNDANGAN
  const handleSelectTemplate = async (templateId: string) => {
    setIsLoading(templateId)
    const supabase = createClient()

    // A. Cek User dulu
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        toast.error("Sesi habis, silakan login lagi.")
        return
    }

    // B. Generate Slug Sementara (biar gak error unique)
    // Contoh: romeo-juliet-12345
    const tempSlug = `undangan-baru-${Math.floor(Math.random() * 100000)}`

    // C. Insert ke Database 'invitations'
    const { data, error } = await supabase
        .from('invitations')
        .insert({
            user_id: user.id,
            slug: tempSlug, 
            theme_config: {
                template_id: templateId, // Kita simpan kode template yang dipilih
                primary_color: templates.find(t => t.id === templateId)?.colors[0]
            },
            groom_info: { name: "Nama Pria" }, // Data default biar gak kosong
            bride_info: { name: "Nama Wanita" },
            is_active: false // Draft dulu
        })
        .select()
        .single()

    if (error) {
        console.error(error)
        toast.error("Gagal membuat undangan", { description: error.message })
        setIsLoading(null)
    } else {
        toast.success("Template berhasil dipilih!", { description: "Mengarahkan ke editor..." })
        // D. Lempar ke Halaman Edit (Nanti kita buat)
        router.push(`/dashboard/invitations/${data.id}`)
    }
  }

  return (
    <div className="space-y-8 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
         <div>
            <Link href="/dashboard" className="text-sm text-slate-500 hover:text-navy flex items-center gap-1 mb-2">
                <ArrowLeft size={14} /> Kembali ke Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-navy font-display">Pilih Template</h1>
            <p className="text-slate-500">Temukan desain yang pas dengan tema acaramu.</p>
         </div>
      </div>

      {/* Grid Template */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {templates.map((template) => (
             <Card key={template.id} className="group overflow-hidden border-navy/10 hover:shadow-2xl transition-all duration-300 hover:border-gold/50 flex flex-col">
                
                {/* Image Preview */}
                <div className="relative h-64 overflow-hidden bg-slate-100">
                    <div className="absolute top-3 right-3 z-10">
                        {template.category === "Premium" ? (
                            <Badge className="bg-navy text-gold border-gold hover:bg-navy">
                                <Sparkles size={10} className="mr-1" /> Premium
                            </Badge>
                        ) : (
                            <Badge variant="secondary" className="bg-white/90 backdrop-blur">
                                Free
                            </Badge>
                        )}
                    </div>
                    
                    <img 
                        src={template.image} 
                        alt={template.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay saat Hover */}
                    <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white text-navy hover:bg-gold hover:text-white font-bold">
                            Lihat Preview
                        </Button>
                    </div>
                </div>

                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold text-navy font-display">{template.name}</h3>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{template.description}</p>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="flex-1">
                    <div className="flex gap-2 text-xs text-slate-500">
                        <span className="font-semibold">Warna Dominan:</span>
                        <div className="flex gap-1">
                            {template.colors.map(c => (
                                <div key={c} className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: c }} />
                            ))}
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="border-t border-slate-50 pt-4">
                    <Button 
                        onClick={() => handleSelectTemplate(template.id)}
                        disabled={isLoading !== null}
                        className="w-full bg-navy hover:bg-navy-dark text-white group-hover:bg-gold group-hover:text-navy transition-colors"
                    >
                        {isLoading === template.id ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...</>
                        ) : (
                            <><Check className="mr-2 h-4 w-4" /> Pilih Template Ini</>
                        )}
                    </Button>
                </CardFooter>
             </Card>
         ))}
      </div>
    </div>
  )
}