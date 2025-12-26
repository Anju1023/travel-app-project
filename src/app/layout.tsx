import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Fuwari - AI Travel Planner",
  description: "ふわりと軽い旅を。AIがあなたにぴったりの旅行プランを提案します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={`${notoSansJP.variable} relative min-h-screen text-slate-700 antialiased selection:bg-sky-200 selection:text-sky-900`}>
        {/* 背景装飾 (オーブ) */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="orb w-96 h-96 bg-sky-200/50 top-[-10%] left-[-10%] animate-float" />
          <div className="orb w-80 h-80 bg-rose-200/40 top-[20%] right-[-5%] animate-float-delayed" />
          <div className="orb w-64 h-64 bg-indigo-100/40 bottom-[-10%] left-[20%] animate-float" />
        </div>

        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-3xl min-h-[calc(100vh-160px)]">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}