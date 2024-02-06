import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog App",
  description:
    "CRUD Blog App using Next.js and TypeScript based on JSONPlaceholder API",
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isArabic = lang === "ar";
  return (
    <html lang={lang} dir={isArabic ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <Navbar />
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
