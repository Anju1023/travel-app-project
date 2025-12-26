import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Noto Sans JP から Zen Maru Gothic に変更！
// 丸っこくて可愛いフォントだよ🍬
const zenMaruGothic = Zen_Maru_Gothic({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap", // フォント読み込み中の表示崩れを防ぐ
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
      <body className={`${zenMaruGothic.variable} relative min-h-screen text-slate-700 antialiased selection:bg-sky-200 selection:text-sky-900 font-sans`}>
        {/* 背景装飾 (オーブ) */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute rounded-full blur-3xl opacity-60 pointer-events-none -z-10 mix-blend-multiply w-96 h-96 bg-sky-200/50 top-[-10%] left-[-10%] animate-float" />
          <div className="absolute rounded-full blur-3xl opacity-60 pointer-events-none -z-10 mix-blend-multiply w-80 h-80 bg-rose-200/40 top-[20%] right-[-5%] animate-float-delayed" />
          <div className="absolute rounded-full blur-3xl opacity-60 pointer-events-none -z-10 mix-blend-multiply w-64 h-64 bg-indigo-100/40 bottom-[-10%] left-[20%] animate-float" />
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