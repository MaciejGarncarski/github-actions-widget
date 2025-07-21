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
    <main>
      <Link href={"/settings"} className="flex gap-2 items-center">
        <Settings />
        Settings
      </Link>
      <h1 className="text-center text-2xl md:text-3xl font-black">
        GitHub Actions Widget
      </h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>loading</p>}>
          <ReposSelect token={token || ""} repo={repo || ""} />
        </Suspense>
        <Suspense fallback={<p>loading</p>}>
          <ActionsList repo={repo || null} owner={username} />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
}
