import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { CookieBannerContainer } from "@/features/cookie-banner/components/cookie-banner-container";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Actions Widget",
  description: "Widget for checking which actions are running in your repos.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-3 md:p-8`}
      >
        <Providers>{children}</Providers>
        <Suspense fallback={null}>
          <CookieBannerContainer />
        </Suspense>
      </body>
    </html>
  );
}
