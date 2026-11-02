import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader } from "next/font/google";
import "./globals.css";

// Display: Archivo dengan sumbu lebar (wdth) supaya nama bisa diset ekstra lebar.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Body: serif yang nyaman dibaca untuk paragraf panjang.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muhammad Farhan | Mobile & Web Developer",
  description:
    "Portofolio Muhammad Farhan, Full-Stack Developer yang membangun aplikasi mobile dengan Kotlin Multiplatform dan Jetpack Compose, serta website dengan Next.js dan React.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${archivo.variable} ${newsreader.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}