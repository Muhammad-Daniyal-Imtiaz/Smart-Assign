// app/layout.tsx
import type { Metadata, Viewport } from "next";
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
  title: "Professional Micro-Services",
  description: "Enterprise-grade micro-services for growing businesses",
};

// Add this viewport export to control zoom/scale
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 0.75, // This sets the zoom to 75%
  minimumScale: 0.75, // Prevents zooming out further
  maximumScale: 0.75, // Prevents zooming in
  userScalable: false, // Disables manual zooming
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="zoom-75">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}