import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Продюсерский центр Евгения Усачева",
  description: "Организация мероприятий федерального уровня, форумов, фестивалей и концертов. Экспертное сопровождение проектов любой сложности.",
  keywords: ["продюсерский центр", "мероприятия", "форумы", "фестивали", "концерты", " event-менеджмент"],
  authors: [{ name: "Евгений Усачев" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Продюсерский центр Евгения Усачева",
    description: "Организация мероприятий федерального уровня",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-[#2C3E50]`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster />
        <CookieBanner />
      </body>
    </html>
  );
}
