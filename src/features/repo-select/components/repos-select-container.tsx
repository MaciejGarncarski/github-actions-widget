import { getReposQueryOptions } from "@/features/repo-select/api/get-repos";
import { PatError } from "@/features/repo-select/components/pat-error";
import { ReposSelect } from "@/features/repo-select/components/repos-select";
import { getConfig } from "@/utils/cookie";
import { getQueryClient } from "@/utils/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const ResposSelectContainer = async () => {
  const config = await getConfig();
  const token = config?.PAT;
  const repo = config?.selectedRepo || null;

  if (!token) {
    return <PatError />;
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(getReposQueryOptions(token));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ReposSelect repo={repo} token={token} />
    </HydrationBoundary>
  );
};
