import { ActionsList } from "@/features/actions-list/components/actions-list";
import { ReposSelect } from "@/features/repo-select/components/repos-select";
import { getReposQueryOptions } from "@/features/repo-select/api/get-repos";
import { getPAT } from "@/utils/cookie";
import { getQueryClient } from "@/utils/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { getRepo } from "@/features/repo-select/api/set-selected-repo";
import { userSchema } from "@/schemas/user";
import { fetcher } from "@/lib/fetcher";
import { SkeletonLoading } from "@/features/actions-list/components/skeleton-loading";

export default async function Home() {
  const token = await getPAT();
  const repo = await getRepo();
  const queryClient = getQueryClient();

  const response = await fetcher({
    method: "GET",
    url: "https://api.github.com/user",
    schema: userSchema,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const username = response.data.login;

  if (token) {
    void queryClient.prefetchQuery(getReposQueryOptions(token));
  }

  return (
    <main className="flex flex-col gap-4 max-w-3xl mx-auto">
      <header className="flex justify-between items-center">
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          GitHub Actions Widget
        </h1>
        <Link
          href={"/settings"}
          className="flex gap-2 items-center backdrop-blur-2xl bg-white/30 px-3 py-2 rounded-lg border border-white/30"
        >
          <Settings size={18} />
          Settings
        </Link>
      </header>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <div className="p-2 flex justify-center gap-2">
              <div className="w-64 h-10 rounded-lg bg-white/30 backdrop-blur-2xl"></div>
            </div>
          }
        >
          <ReposSelect token={token || ""} repo={repo || ""} />
        </Suspense>
        <Suspense fallback={<SkeletonLoading />}>
          <ActionsList repo={repo || null} owner={username} />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
