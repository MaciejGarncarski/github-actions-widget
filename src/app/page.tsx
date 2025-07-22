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
import { getActionsQueryOptions } from "@/features/actions-list/api/get-actions";
import { cookies } from "next/headers";
import { SelectLoadingSkeleton } from "@/features/repo-select/components/select-loading-skeleton";
import { RateLimitInfo } from "@/features/rate-limit/components/rate-limit-info";

export default async function Home() {
  const token = await getPAT();
  const repo = await getRepo();
  const queryClient = getQueryClient();
  const appCookies = await cookies();

  const response = await fetcher({
    method: "GET",
    url: "https://api.github.com/user",
    schema: userSchema,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const cookiesAccepted = appCookies.get("selectedRepo");
  const username = response.data.login;

  if (token) {
    void queryClient.prefetchQuery(getReposQueryOptions(token));
    void queryClient.prefetchInfiniteQuery(
      getActionsQueryOptions({
        owner: username,
        token: token,
        repo: cookiesAccepted?.value || "",
      })
    );
  }

  const rateLimitData = appCookies.get("rateLimit")?.value;

  return (
    <div>
      <main className="flex flex-col gap-4 max-w-3xl mx-auto">
        <header className="flex justify-between items-center flex-col sm:flex-row gap-2">
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
          <Suspense fallback={<SelectLoadingSkeleton />}>
            <ReposSelect token={token || ""} repo={repo || ""} />
          </Suspense>

          {token && (
            <>
              <Suspense
                fallback={
                  <div className="mx-auto text-lg backdrop-blur-2xl text-center w-full px-6 py-3 rounded-lg shadow border border-white/30"></div>
                }
              >
                <RateLimitInfo rateLimitData={rateLimitData || ""} />
              </Suspense>

              <Suspense fallback={<SkeletonLoading />}>
                <ActionsList
                  repo={repo || null}
                  owner={username}
                  token={token}
                />
              </Suspense>
            </>
          )}
        </HydrationBoundary>
      </main>
    </div>
  );
}
