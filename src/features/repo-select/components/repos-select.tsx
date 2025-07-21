"use client";
import { useGetRepos } from "@/features/repo-select/api/get-repos";
import { setSelectedRepo } from "@/features/repo-select/api/set-selected-repo";
import { useQueryClient } from "@tanstack/react-query";

export function ReposSelect({ token, repo }: { token: string; repo: string }) {
  const { data, isError } = useGetRepos(token);
  const queryClient = useQueryClient();

  if (isError || !data) {
    return <p>cannot fetch repos</p>;
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
    <div className="p-2 flex justify-center gap-2">
      <label htmlFor="selectRepo">Selected reposiotry:</label>
      <select
        className="text-pink-300 bg-black"
        name="repo"
        defaultValue={repo}
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
