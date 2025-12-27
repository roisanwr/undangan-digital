import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, PlayCircle } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pt-10 pb-20 lg:pt-20 lg:pb-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* BAGIAN KIRI: Teks & Tombol */}
          <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-navy tracking-tight leading-tight mb-6 font-display">
              <span className="block">Ciptakan Undangan</span>
              <span className="text-gold block mt-2">Sekelas Designer</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Dalam 5 menit tanpa keahlian khusus. Platform undangan digital premium dengan proses super mudah, fitur lengkap, dan hasil memukau.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/register">
                <Button className="w-full sm:w-auto bg-navy hover:bg-navy-dark text-white px-8 py-6 text-lg rounded-xl shadow-xl shadow-navy/20 transition-all hover:-translate-y-1">
                  Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link href="#demo">
                <Button variant="outline" className="w-full sm:w-auto border-navy text-navy hover:bg-navy/5 px-8 py-6 text-lg rounded-xl">
                  Lihat Demo <PlayCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200" />
                  ))}
               </div>
               <p>Bergabung dengan <span className="font-bold text-navy">2,000+</span> pengantin</p>
            </div>
          </div>

          {/* BAGIAN KANAN: Gambar */}
          <div className="w-full lg:w-1/2 relative">
             {/* Efek Blob Background */}
             <div className="absolute -top-20 -right-20 w-96 h-96 bg-gold/20 rounded-full blur-3xl opacity-50 animate-pulse" />
             <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-navy/10 rounded-full blur-3xl opacity-50" />
             
             {/* Gambar Utama */}
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition duration-500">
                <img 
                  src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000&q=80" 
                  alt="Wedding Couple" 
                  className="w-full h-auto object-cover hover:scale-105 transition duration-700"
                />
                
                {/* Floating Card Kecil (Hiasan) */}
                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg flex items-center gap-3 animate-bounce duration-[3000ms]">
                   <div className="bg-green-100 p-2 rounded-full text-green-600">🎉</div>
                   <div>
                      <p className="text-xs text-slate-500 font-semibold">RSVP Baru</p>
                      <p className="text-sm font-bold text-navy">Sarah konfirmasi hadir!</p>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}