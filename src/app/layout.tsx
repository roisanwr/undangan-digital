import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"; // 👈 1. Import Toaster Sonner

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Update Judul & Deskripsi Website biar keren
export const metadata: Metadata = {
  title: "MomenKita - Undangan Digital",
  description: "Platform undangan pernikahan digital premium dengan fitur lengkap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        
        {/* 3. Pasang Komponen Toaster disini */}
        {/* position="top-center" = Biar muncul di tengah atas */}
        {/* richColors = Biar warna sukses hijau & error merahnya nyala */}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}