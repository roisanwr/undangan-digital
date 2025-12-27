import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"

export default function Home() {
  return (
    <main className="min-h-screen bg-cream selection:bg-gold/30">
      <Navbar />
      <Hero />
      
      {/* Spacer sementara biar bisa di-scroll */}
      <div className="py-20 text-center text-slate-400">
        <p>↓ Section Fitur & Template akan kita buat selanjutnya ↓</p>
      </div>
    </main>
  )
}