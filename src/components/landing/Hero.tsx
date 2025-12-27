import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, PlayCircle } from "lucide-react"

export default function Hero() {
  return (
    // RESPONSIVE TWEAK:
    // Mobile: pt-6 (Rapat ke atas) | Desktop: pt-10
    // Mobile: pb-12 (Jarak bawah sedang) | Desktop: pb-24
    <section className="relative overflow-hidden bg-cream pt-6 pb-12 lg:pt-10 lg:pb-24">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* RESPONSIVE TWEAK:
            Mobile: gap-8 (Biar teks & gambar gak berjauhan)
            Desktop: gap-16 (Biar lega) 
        */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          
          {/* BAGIAN KIRI: Teks & Tombol */}
          <div className="w-full lg:w-7/12 text-center lg:text-left z-10">
            {/* Font Mobile: text-3xl (Biar gak ketabrak layar) -> Desktop: text-6xl */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-navy tracking-tight leading-tight mb-4 font-display">
              <span className="block">Ciptakan Undangan</span>
              <span className="text-gold block mt-1 sm:mt-2">Sekelas Designer</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Dalam 5 menit tanpa keahlian khusus. Platform undangan digital premium dengan proses super mudah, fitur lengkap, dan hasil memukau.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto">
              <Link href="/register" className="w-full sm:w-auto">
                <Button className="w-full bg-navy hover:bg-navy-dark text-white px-8 py-6 text-lg rounded-xl shadow-xl shadow-navy/20 transition-all hover:-translate-y-1">
                  Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="#demo" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-navy text-navy hover:bg-navy/5 px-8 py-6 text-lg rounded-xl">
                  Lihat Demo <PlayCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-6 sm:mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                  ))}
               </div>
               <p>Bergabung dengan <span className="font-bold text-navy">2,000+</span> pengantin</p>
            </div>
          </div>

          {/* BAGIAN KANAN: Gambar */}
          <div className="w-full lg:w-5/12 relative mt-4 lg:mt-0 px-4 sm:px-0">
             {/* Efek Blob (Hidden di HP biar performa enteng) */}
             <div className="hidden sm:block absolute -top-20 -right-20 w-80 h-80 bg-gold/20 rounded-full blur-3xl opacity-50 animate-pulse" />
             <div className="hidden sm:block absolute -bottom-20 -left-20 w-64 h-64 bg-navy/10 rounded-full blur-3xl opacity-50" />
             
             {/* Gambar Utama */}
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500 lg:w-[90%] mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80" 
                  alt="Wedding Couple" 
                  className="w-full h-auto object-cover hover:scale-105 transition duration-700"
                />
                
                {/* Floating Card: Skala lebih kecil di HP (scale-90) biar gak nutupin muka */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur p-2 sm:p-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce duration-[3000ms] scale-90 sm:scale-100 origin-bottom-left">
                   <div className="bg-green-100 p-1.5 sm:p-2 rounded-full text-green-600">🎉</div>
                   <div>
                      <p className="text-[10px] sm:text-xs text-slate-500 font-semibold">RSVP Baru</p>
                      <p className="text-xs sm:text-sm font-bold text-navy">Sarah konfirmasi!</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}