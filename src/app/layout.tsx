import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { cookies } from "next/headers";
import { CookieBanner } from "@/features/cookie-banner/components/cookie-banner";

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
  const appCookies = await cookies();
  const cookiesAccepted = appCookies.get("cookiesAccepted")?.value === "true";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-3 md:p-8`}
      >
        <Providers>{children}</Providers>
        <CookieBanner accepted={cookiesAccepted} />
      </body>
    </html>
  );
}
