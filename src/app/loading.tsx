import { LoaderIcon, Settings } from "lucide-react";
import Link from "next/link";

export default function LoadingApp() {
  return (
    <main className="flex flex-col gap-4 max-w-3xl mx-auto">
      <header className="flex justify-between items-center flex-col sm:flex-row gap-2">
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          GitHub Actions Widget
        </h1>
        <Link
          prefetch
          href={"/settings"}
          className="flex gap-2 items-center backdrop-blur-2xl bg-white/30 px-3 py-2 rounded-lg border border-white/30"
        >
          <Settings size={18} />
          Settings
        </Link>
      </header>
      <div className="flex flex-col gap-4 justify-center items-center">
        <LoaderIcon className="animate-spin" size={50} />
        <p className="text-2xl">Loading</p>
      </div>
    </main>
  );
}
