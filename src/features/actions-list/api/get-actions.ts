import { fetcher } from "@/lib/fetcher";
import { actionsSchema } from "@/schemas/actions";
import {
  infiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

type Data = {
  owner: string;
  repo: string;
};

export const getActionsQueryOptions = ({ owner, repo }: Data) =>
  infiniteQueryOptions({
    initialPageParam: 0,
    refetchInterval: 5000,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const lastPageLenghth = Array.isArray(lastPage?.workflow_runs)
        ? lastPage.workflow_runs.length
        : 0;

      if (lastPageLenghth === 0) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    queryKey: ["actions", repo],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    queryFn: async () => {
      const response = await fetcher({
        method: "GET",
        url: `http://localhost:3000/api/actions?owner=${owner}&repo=${repo}`,
        schema: actionsSchema,
      });

      if (response.isError) {
        return null;
      }

      return response.data;
    },
  });

export const useGetActions = (data: Data) => {
  return useSuspenseInfiniteQuery(getActionsQueryOptions(data));
};
