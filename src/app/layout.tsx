import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Go Game", // Du kan endre dette til noe mer passende
  description: "Play the classic game of Go", // Og dette
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        suppressHydrationWarning på <html> er lagt til fordi useEffect i page.tsx
        kan modifisere style-attributtet på document.documentElement (<html>)
        for å sette CSS-variabler for tema.
      */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/*
          suppressHydrationWarning på <body> er lagt til fordi useEffect i page.tsx
          kan modifisere classList på document.body for å legge til temaklasser
          (f.eks. 'light' eller 'dark').
        */}
        {children}
      </body>
    </html>
  );
}
