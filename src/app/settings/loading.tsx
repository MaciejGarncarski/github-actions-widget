"use client";

import { ChevronLeft, LoaderIcon } from "lucide-react";
import Link from "next/link";

export default function LoadingSettings() {
  return (
    <main className="flex flex-col gap-8 max-w-3xl mx-auto">
      <header className="flex justify-between items-center">
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          Settings Page
        </h1>
        <Link
          prefetch
          href={"/"}
          className="flex gap-2 items-center backdrop-blur-2xl bg-white/30 px-3 py-2 rounded-lg border border-white/30"
        >
          <ChevronLeft size={18} />
          Back
        </Link>
      </header>

      <div className="flex flex-col gap-4 justify-center items-center">
        <LoaderIcon className="animate-spin" size={50} />
        <p className="text-2xl">Loading</p>
      </div>
    </main>
  );
}
