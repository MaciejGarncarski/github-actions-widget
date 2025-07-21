import { fetcher } from "@/lib/fetcher";
import { actionsSchema } from "@/schemas/actions";
import {
  InfiniteData,
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import z from "zod";

type Data = {
  owner: string;
  repo: string;
};

const PER_PAGE = 10;

type GithubRunsPage = {
  workflow_runs: z.infer<typeof actionsSchema>["workflow_runs"];
  nextPage?: number;
} | null;

export const getActionsQueryOptions = ({ owner, repo }: Data) =>
  infiniteQueryOptions<
    GithubRunsPage,
    Error,
    InfiniteData<GithubRunsPage>,
    unknown[],
    number
  >({
    initialPageParam: 1,
    refetchInterval: 5000,
    staleTime: 10000,
    gcTime: 20000,
    getNextPageParam: (lastPage) => lastPage?.nextPage,
    queryKey: ["actions", repo],
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    queryFn: async ({ pageParam }) => {
      const response = await fetcher({
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_APP_URL}/api/actions?owner=${owner}&repo=${repo}&page=${pageParam}`,
        schema: actionsSchema,
      });

      if (response.isError) {
        return null;
      }

      return {
        workflow_runs: response.data.workflow_runs,
        nextPage:
          response.data.total_count > pageParam * PER_PAGE
            ? pageParam + 1
            : undefined,
      };
    },
  });

export const useGetActions = (data: Data) => {
  return useSuspenseInfiniteQuery(getActionsQueryOptions(data));
};
