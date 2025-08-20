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
  title: "FlightNav - Professional Aviation Tools",
  description: "Professional aviation calculation tools including wind triangle calculator, distance calculator, and weight & balance tools for pilots and aviation professionals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1f2937" />
        <meta name="background-color" content="#ffffff" />
        
        {/* Apple Touch Icons and Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FlightNav" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon.svg" />
        
        {/* Android/Chrome Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="FlightNav" />
        
        {/* Microsoft Meta Tags */}
        <meta name="msapplication-TileColor" content="#1f2937" />
        <meta name="msapplication-TileImage" content="/icons/icon.svg" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* General Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
        <link rel="shortcut icon" href="/icons/icon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased touch-manipulation select-none`}
      >
        {children}
      </body>
    </html>
  );
}
