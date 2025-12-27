'use client'

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Loader2, Globe, ArrowUpRight } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

// Kita terima data awal dari Server Component
export default function InvitationEditor({ invitation }: { invitation: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  // State untuk menyimpan perubahan data
  const [formData, setFormData] = useState({
    slug: invitation.slug,
    is_active: invitation.is_active,
    groom_info: invitation.groom_info || {}, // Jaga-jaga kalo kosong
    bride_info: invitation.bride_info || {},
    // Nanti kita tambah session/acara disini
  })

  // FUNGSI UPDATE DATA (Nested Object emang agak tricky)
  const updateGroom = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      groom_info: { ...prev.groom_info, [field]: value }
    }))
  }

  const updateBride = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      bride_info: { ...prev.bride_info, [field]: value }
    }))
  }

  // FUNGSI SAVE KE DATABASE
  const handleSave = async () => {
    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('invitations')
      .update({
        slug: formData.slug,
        is_active: formData.is_active,
        groom_info: formData.groom_info,
        bride_info: formData.bride_info,
        // updated_at: new Date() // Supabase biasanya handle ini otomatis kalo disetting
      })
      .eq('id', invitation.id)

    if (error) {
      toast.error("Gagal menyimpan!", { description: error.message })
    } else {
      toast.success("Perubahan disimpan!")
      router.refresh() // Refresh biar data server sinkron
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      
      {/* HEADER EDITOR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm sticky top-0 z-10">
         <div>
            <h2 className="text-lg font-bold text-navy font-display">Editor Undangan</h2>
            <div className="flex items-center gap-2 text-xs text-slate-500">
               <Globe size={12} />
               <span>Link:</span>
               <a href={`/invitation/${formData.slug}`} target="_blank" className="text-blue-600 hover:underline flex items-center">
                  momenkita.id/{formData.slug} <ArrowUpRight size={10} className="ml-1"/>
               </a>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-4 bg-slate-50 px-3 py-1.5 rounded-lg border">
                <Switch 
                    checked={formData.is_active} 
                    onCheckedChange={(val) => setFormData({...formData, is_active: val})}
                />
                <Label className="text-xs font-medium cursor-pointer">
                    {formData.is_active ? "Publik (Online)" : "Draft (Offline)"}
                </Label>
            </div>
            <Button onClick={handleSave} disabled={loading} className="bg-navy hover:bg-navy-dark text-white">
               {loading ? <Loader2 className="animate-spin mr-2 h-4 w-4"/> : <Save className="mr-2 h-4 w-4"/>}
               Simpan Perubahan
            </Button>
         </div>
      </div>

      {/* TABS KONTEN */}
      <Tabs defaultValue="mempelai" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="mempelai">Mempelai</TabsTrigger>
          <TabsTrigger value="acara">Acara</TabsTrigger>
          <TabsTrigger value="pengaturan">Pengaturan</TabsTrigger>
        </TabsList>

        {/* 1. TAB MEMPELAI */}
        <TabsContent value="mempelai" className="space-y-4 mt-4">
           <div className="grid md:grid-cols-2 gap-6">
              {/* Data Pria */}
              <Card>
                 <CardHeader>
                    <CardTitle>Mempelai Pria 🤵</CardTitle>
                    <CardDescription>Data lengkap pengantin laki-laki.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    <div className="space-y-1">
                        <Label>Nama Lengkap</Label>
                        <Input 
                            value={formData.groom_info.full_name || ""} 
                            onChange={(e) => updateGroom("full_name", e.target.value)}
                            placeholder="Contoh: Rois Anwar, S.Kom"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Nama Panggilan</Label>
                        <Input 
                            value={formData.groom_info.nickname || ""} 
                            onChange={(e) => updateGroom("nickname", e.target.value)}
                            placeholder="Rois"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Nama Ayah</Label>
                        <Input 
                            value={formData.groom_info.father_name || ""} 
                            onChange={(e) => updateGroom("father_name", e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Nama Ibu</Label>
                        <Input 
                            value={formData.groom_info.mother_name || ""} 
                            onChange={(e) => updateGroom("mother_name", e.target.value)}
                        />
                    </div>
                 </CardContent>
              </Card>

              {/* Data Wanita */}
              <Card>
                 <CardHeader>
                    <CardTitle>Mempelai Wanita 👰</CardTitle>
                    <CardDescription>Data lengkap pengantin perempuan.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    <div className="space-y-1">
                        <Label>Nama Lengkap</Label>
                        <Input 
                            value={formData.bride_info.full_name || ""} 
                            onChange={(e) => updateBride("full_name", e.target.value)}
                            placeholder="Contoh: Siti Aisyah, S.M"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Nama Panggilan</Label>
                        <Input 
                            value={formData.bride_info.nickname || ""} 
                            onChange={(e) => updateBride("nickname", e.target.value)}
                            placeholder="Aisyah"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Nama Ayah</Label>
                        <Input 
                            value={formData.bride_info.father_name || ""} 
                            onChange={(e) => updateBride("father_name", e.target.value)}
                        />
                    </div>
                    <div className="space-y-1">
                        <Label>Nama Ibu</Label>
                        <Input 
                            value={formData.bride_info.mother_name || ""} 
                            onChange={(e) => updateBride("mother_name", e.target.value)}
                        />
                    </div>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>

        {/* 2. TAB ACARA (Placeholder dulu) */}
        <TabsContent value="acara">
           <Card>
              <CardHeader><CardTitle>Jadwal Acara</CardTitle></CardHeader>
              <CardContent>
                 <p className="text-slate-500">Fitur edit Akad & Resepsi akan kita tambahkan di langkah berikutnya ya! Fokus simpan data mempelai dulu. 😉</p>
              </CardContent>
           </Card>
        </TabsContent>

        {/* 3. TAB PENGATURAN */}
        <TabsContent value="pengaturan">
           <Card>
              <CardHeader><CardTitle>URL Undangan</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                  <div className="space-y-1">
                        <Label>Slug Link (Unik)</Label>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-500">momenkita.id/</span>
                            <Input 
                                value={formData.slug} 
                                onChange={(e) => setFormData({...formData, slug: e.target.value})}
                            />
                        </div>
                        <p className="text-xs text-slate-400">Hanya boleh huruf, angka, dan strip (-).</p>
                    </div>
              </CardContent>
           </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}