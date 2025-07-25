import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import { CookieBannerContainer } from "@/features/cookie-banner/components/cookie-banner-container";
import { Suspense } from "react";
import Image from "next/image";
import bgGif from "@/assets/bg.gif";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-3 md:p-8 relative`}
      >
        <Image
          src={bgGif}
          width={1920}
          height={1080}
          alt=""
          quality={30}
          priority
          className="fixed blur-xs h-full lg:w-full -z-10 top-0 object-cover"
        />
        <Providers>{children}</Providers>
        <Suspense fallback={null}>
          <CookieBannerContainer />
        </Suspense>
        <footer className="flex justify-between rounded-lg border border-white/20 backdrop-blur-2xl bg-black/30 p-2 xl:p-3 fixed bottom-2 text-sm xl:text-base xl:bottom-4 w-[21rem] -translate-x-1/2 xl:translate-0 left-1/2 xl:left-[unset] xl:right-4">
          <a
            href="https://github.com/maciejgarncarski/github-actions-widget"
            target="_blank"
            className="flex gap-2 items-center justify-center"
          >
            <div className="size-4 flex justify-center items-center">
              <svg
                role="img"
                className="align-middle block"
                width={16}
                height={16}
                fill="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
            GitHub
          </a>
          <p className="text-gray-300">
            Made by{" "}
            <span className="text-white font-semibold">Maciej Garncarski</span>
          </p>
        </footer>
      </body>
    </html>
  );
}
