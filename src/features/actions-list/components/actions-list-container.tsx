import { getActionsQueryOptions } from "@/features/actions-list/api/get-actions";
import { ActionsList } from "@/features/actions-list/components/actions-list";
import { RateLimitInfo } from "@/features/actions-list/components/rate-limit-info";
import { getConfig } from "@/utils/cookie";
import { getQueryClient } from "@/utils/get-query-client";
import { getUser } from "@/utils/get-user";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const ActionsListContainer = async () => {
  const queryClient = getQueryClient();
  const config = await getConfig();

  if (!config?.PAT || !config.selectedRepo) {
    return null;
  }

  const userResponse = await getUser(config?.PAT || "");
  const username = userResponse?.data?.login;

  void queryClient.prefetchInfiniteQuery(
    getActionsQueryOptions({
      owner: username,
      repo: config.selectedRepo,
      token: config.PAT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RateLimitInfo
        token={config.PAT}
        owner={username}
        repo={config?.selectedRepo}
      />
      <ActionsList
        repo={config?.selectedRepo}
        owner={username}
        token={config.PAT}
      />
    </HydrationBoundary>
  );
};
