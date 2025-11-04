"use client";
import { useGetRepos } from "@/features/repo-select/api/get-repos";
import { setSelectedRepo } from "@/features/repo-select/api/set-selected-repo";
import { PatError } from "@/features/repo-select/components/pat-error";
import { useQueryClient } from "@tanstack/react-query";

export function ReposSelect({
  token,
  repo,
}: {
  token: string | null;
  repo: string | null;
}) {
  const { data, isError, isLoading } = useGetRepos(token);
  const queryClient = useQueryClient();

  if (isError || !data) {
    return <PatError />;
  }

  const sortedData = data.toSorted((a, b) => {
    if (a.updated_at && !b.updated_at) {
      return -1;
    }

    if (!a.updated_at && b.updated_at) {
      return 1;
    }

    if (a.updated_at && b.updated_at) {
      return new Date(a.updated_at) > new Date(b.updated_at) ? -1 : 1;
    }

    return 0;
  });

  return (
    <div className="p-4 flex flex-col md:flex-row justify-center gap-2 h-24 md:gap-4 md:h-20 border border-slate-400/20 items-center bg-primary backdrop-blur-2xl rounded-lg">
      <label htmlFor="selectRepo" className="text-xl">
        Selected reposiotry:
      </label>
      <select
        className="bg-white text-black rounded-sm px-2 py-1"
        name="repo"
        defaultValue={repo || ""}
        id="selectRepo"
        onChange={(changeEvent) => {
          setSelectedRepo(changeEvent.target.value);
          queryClient.invalidateQueries({ queryKey: ["actions"] });
        }}
      >
        {sortedData.map((el) => {
          return (
            <option key={el.name} value={el.name}>
              {el.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
