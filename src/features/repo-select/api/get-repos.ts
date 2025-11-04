import { fetcher } from "@/lib/fetcher";
import { reposSchema } from "@/schemas/repos";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

export const getReposQueryOptions = (token: string | null) => {
  return queryOptions({
    queryKey: ["repos"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 3,
    queryFn: async () => {
      const response = await fetcher({
        method: "GET",
        url: "https://api.github.com/user/repos",
        schema: reposSchema,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        headersStrategy: "overwrite",
      });

      if (response.isError) {
        return null;
      }

      return response.data;
    },
  });
};
export const useGetRepos = (token: string | null) => {
  return useSuspenseQuery(getReposQueryOptions(token));
};
