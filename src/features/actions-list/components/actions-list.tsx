"use client";

import { useGetActions } from "@/features/actions-list/api/get-actions";
import { Check, LoaderIcon, WatchIcon } from "lucide-react";
import { Fragment } from "react";

type Props = {
  repo: string | null;
  owner: string;
};

export const ActionsList = ({ owner, repo }: Props) => {
  const { data } = useGetActions({
    owner,
    repo: repo || "",
  });

  if (!repo) {
    return <p>select repo first</p>;
  }

  return (
    <div>
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group?.workflow_runs.map(({ id, name, status }) => (
            <article
              key={id}
              className="p-4 h-40 w-80 border border-white/10 rounded-xl backdrop-blur-4xl bg-white/15"
            >
              <h2>{name}</h2>
              <p className="flex">
                {status === "in_progress" && (
                  <LoaderIcon className="animate-spin" />
                )}
                {status === "completed" && <Check />}
                {status === "queued" && <WatchIcon />}
                {status}
              </p>
            </article>
          ))}
        </Fragment>
      ))}
    </div>
  );
};
