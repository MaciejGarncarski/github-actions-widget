import { Settings } from "lucide-react";
import Link from "next/link";
import { ResposSelectContainer } from "@/features/repo-select/components/repos-select-container";
import { ActionsListContainer } from "@/features/actions-list/components/actions-list-container";
import { Suspense } from "react";
import { SelectLoadingSkeleton } from "@/features/repo-select/components/select-loading-skeleton";
import { SkeletonLoading } from "@/features/actions-list/components/skeleton-loading";

export default async function Home() {
  return (
    <div>
      <main className="flex flex-col gap-4 max-w-3xl mx-auto">
        <header className="flex justify-between items-center flex-col sm:flex-row gap-2">
          <h1 className="text-center text-2xl md:text-3xl font-bold">
            GitHub Actions Widget
          </h1>
          <Link
            prefetch
            href={"/settings"}
            className="flex gap-2 items-center backdrop-blur-2xl bg-primary px-3 py-2 rounded-lg border border-primary/20"
          >
            <Settings size={18} />
            Settings
          </Link>
        </header>
        <Suspense fallback={<SelectLoadingSkeleton />}>
          <ResposSelectContainer />
        </Suspense>
        <Suspense fallback={<SkeletonLoading />}>
          <ActionsListContainer />
        </Suspense>
      </main>
    </div>
  );
}
