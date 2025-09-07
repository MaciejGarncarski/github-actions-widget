import { ActionsList } from "@/features/actions-list/components/actions-list";
import { ReposSelect } from "@/features/repo-select/components/repos-select";
import { getReposQueryOptions } from "@/features/repo-select/api/get-repos";
import { getConfig } from "@/utils/cookie";
import { getQueryClient } from "@/utils/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { SkeletonLoading } from "@/features/actions-list/components/skeleton-loading";
import { getActionsQueryOptions } from "@/features/actions-list/api/get-actions";
import { SelectLoadingSkeleton } from "@/features/repo-select/components/select-loading-skeleton";
import { RateLimitInfo } from "@/features/rate-limit/components/rate-limit-info";
import { getUser } from "@/utils/get-user";

export default async function Home() {
  const queryClient = getQueryClient();
  const config = await getConfig();

  const userResponse = await getUser(config.PAT || "");
  const username = userResponse.data.login;

  if (config?.PAT) {
    void queryClient.prefetchQuery(getReposQueryOptions(config.PAT));
    void queryClient.prefetchInfiniteQuery(
      getActionsQueryOptions({
        owner: username,
        token: config.PAT,
        repo: config?.selectedRepo || "",
      })
    );
  }

  const dehydratedState = dehydrate(queryClient);

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
            className="flex gap-2 items-center backdrop-blur-2xl bg-black/30 px-3 py-2 rounded-lg border border-white/20"
          >
            <Settings size={18} />
            Settings
          </Link>
        </header>
        <HydrationBoundary state={dehydratedState}>
          <Suspense fallback={<SelectLoadingSkeleton />}>
            <ReposSelect
              token={config?.PAT || ""}
              repo={config?.selectedRepo || ""}
            />
          </Suspense>
          {config?.PAT && (
            <>
              <Suspense
                fallback={
                  <div className="min-h-24 mx-auto text-lg backdrop-blur-2xl text-center w-full px-6 py-3 rounded-lg shadow border border-white/20"></div>
                }
              >
                <RateLimitInfo
                  token={config.PAT}
                  owner={username}
                  repo={config?.selectedRepo || ""}
                />
              </Suspense>

              <Suspense fallback={<SkeletonLoading />}>
                <ActionsList
                  repo={config?.selectedRepo || null}
                  owner={username}
                  token={config.PAT}
                />
              </Suspense>
            </>
          )}
        </HydrationBoundary>
      </main>
    </div>
  );
}
