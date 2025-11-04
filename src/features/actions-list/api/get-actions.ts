import { ACTIONS_PER_PAGE } from "@/constants/actions";
import { fetcher } from "@/lib/fetcher";
import { actionsSchema, actionsSchemaApi } from "@/schemas/actions";
import { rateLimitSchema } from "@/schemas/rate-limit";
import {
  InfiniteData,
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import z from "zod";

type GithubRunsPage = {
  workflow_runs: z.infer<typeof actionsSchema>["workflow_runs"];
  nextPage?: number;
  rate_limit: z.infer<typeof rateLimitSchema> | null;
} | null;

type Data = {
  owner?: string;
  token?: string | null;
  repo?: string;
};

export const getActionsQueryOptions = (
  { owner, repo, token }: Data,
  setIsManualRefetching?: (val: boolean) => void
) => {
  return infiniteQueryOptions<
    GithubRunsPage,
    Error,
    InfiniteData<GithubRunsPage>,
    unknown[],
    number
  >({
    initialPageParam: 1,
    refetchInterval: 3000,
    staleTime: 10000,
    gcTime: 20000,
    getNextPageParam: (lastPage) => lastPage?.nextPage,
    queryKey: ["actions", repo],
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    enabled: Boolean(owner) && Boolean(repo) && Boolean(token),
    queryFn: async ({ pageParam }) => {
      const response = await fetcher({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/actions?owner=${owner}&repo=${repo}&page=${pageParam}`,
        schema: actionsSchemaApi,
        headers: {
          "X-API-KEY": token || "",
        },
      });

      if (response.isError) {
        return null;
      }

      setIsManualRefetching?.(false);

      return {
        rate_limit: response.data.rate_limit,
        workflow_runs: response.data.workflow_runs,
        nextPage:
          response.data.total_count > pageParam * ACTIONS_PER_PAGE
            ? pageParam + 1
            : undefined,
      };
    },
  });
};

export const useGetActions = (
  data: Data,
  setIsManualRefetching?: (val: boolean) => void
) => {
  return useSuspenseInfiniteQuery(
    getActionsQueryOptions(data, setIsManualRefetching)
  );
};
