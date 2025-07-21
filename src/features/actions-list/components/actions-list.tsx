"use client";

import { useGetActions } from "@/features/actions-list/api/get-actions";
import { TimeElapsed } from "@/features/actions-list/components/time-elapsed";
import { ActionStatus, GitHubConclusion } from "@/schemas/actions";
import clsx from "clsx";
import {
  Check,
  FileQuestion,
  LoaderIcon,
  ShieldEllipsis,
  SkipForward,
  StopCircle,
  TimerIcon,
  WatchIcon,
  X,
} from "lucide-react";
import { Fragment, ReactNode } from "react";

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

  if (data.pages[0]?.workflow_runs.length === 0) {
    return (
      <p className="mx-auto text-3xl backdrop-blur-2xl text-center w-fit my-10 p-2 rounded shadow border">
        There are no actions in selected repo.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
      {data.pages.map((group, i) => {
        return (
          <Fragment key={i}>
            {group?.workflow_runs.map(
              ({
                id,
                name,
                status,
                conclusion,
                head_sha,
                run_started_at,
                display_title,
                html_url,
              }) => {
                return (
                  <article
                    key={id}
                    className={clsx(
                      "flex flex-col gap-2 p-4 min-h-32 w-full border rounded-xl backdrop-blur-2xl backdrop-saturate-110 shadow",
                      conclusion
                        ? conclusionBorderColors[conclusion]
                        : statusBorderColors[status],
                      conclusion && conclusionBackgroundColors[conclusion]
                    )}
                  >
                    <div className="flex justify-between">
                      <a href={html_url} target="_blank">
                        <h2>
                          {name} - {display_title}
                        </h2>
                      </a>
                      <p className="flex gap-2 items-center">
                        {conclusion ? (
                          conclusionIcons[conclusion]
                        ) : (
                          <>
                            {status === "in_progress" && (
                              <LoaderIcon className="animate-spin" size={20} />
                            )}
                            {status === "completed" && <Check size={20} />}
                            {status === "queued" && <WatchIcon size={20} />}
                          </>
                        )}
                        {status === "completed"
                          ? conclusionMap[conclusion || "neutral"]
                          : statusMap[status]}
                      </p>
                    </div>
                    {!conclusion && status === "in_progress" && (
                      <TimeElapsed initialDate={new Date(run_started_at)} />
                    )}
                    <p>Start date {new Date(run_started_at).toISOString()}</p>
                    <p className="mt-auto text-stone-400 text-sm">{head_sha}</p>
                  </article>
                );
              }
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

const statusBorderColors: Record<ActionStatus, string> = {
  completed: "border-green-500/30",
  in_progress: "border-yellow-500/30",
  queued: "border-white/10",
};

const statusMap: Record<ActionStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  queued: "Queued",
};

const conclusionMap: Record<GitHubConclusion, string> = {
  action_required: "Action required",
  cancelled: "Cancelled",
  failure: "Failure",
  neutral: "Neutral",
  skipped: "Skipped",
  stale: "Stale",
  success: "Success",
  timed_out: "Timed out",
};

const conclusionBorderColors: Record<GitHubConclusion, string> = {
  action_required: "border-orange-500/30",
  cancelled: "border-orange-500/30",
  failure: "border-red-500/30",
  neutral: "border-gray-500/30",
  skipped: "border-blue-500/30",
  stale: "border-blue-500/30",
  success: "border-green-500/30",
  timed_out: "border-orange-500/30",
};

const conclusionBackgroundColors: Record<GitHubConclusion, string> = {
  action_required: "bg-orange-500/18",
  cancelled: "bg-orange-500/18",
  failure: "bg-red-500/18",
  neutral: "bg-gray-500/18",
  skipped: "bg-blue-500/18",
  stale: "bg-blue-500/18",
  success: "bg-green-500/18",
  timed_out: "bg-orange-500/18",
};

const conclusionIcons: Record<GitHubConclusion, ReactNode> = {
  action_required: <FileQuestion />,
  cancelled: <StopCircle />,
  failure: <X />,
  neutral: null,
  skipped: <SkipForward />,
  stale: <ShieldEllipsis />,
  success: <Check />,
  timed_out: <TimerIcon />,
};
