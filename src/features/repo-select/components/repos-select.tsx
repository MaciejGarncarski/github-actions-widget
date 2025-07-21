"use client";
import { useGetRepos } from "@/features/repo-select/api/get-repos";
import { setSelectedRepo } from "@/features/repo-select/api/set-selected-repo";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

export function ReposSelect({ token, repo }: { token: string; repo: string }) {
  const { data, isError } = useGetRepos(token);
  const queryClient = useQueryClient();

  if (isError || !data) {
    return (
      <div className="text-center p-4 backdrop-blur-3xl w-fit bg-black/30 text-amber-300 rounded-lg mx-auto flex flex-col gap-4">
        <p>
          Cannot fetch repos, please provide valid PERSONAL ACCESS TOKEN in{" "}
          <Link href="/settings" className="underline">
            settings
          </Link>
          .
        </p>
        <div className="flex gap-4 justify-center">
          <a href="pat-permissions.png" target="_blank" className="underline">
            Needed Permissions
          </a>
          <a
            href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token"
            target="_blank"
            className="underline"
          >
            How to create Personal Access Tokens
          </a>
        </div>
      </div>
    );
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
    <div className="p-2 flex justify-center gap-2 items-center">
      <label htmlFor="selectRepo" className="text-xl">
        Selected reposiotry:
      </label>
      <select
        className="bg-white/90 backdrop-blur-sm text-black rounded-sm px-2 py-1"
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
