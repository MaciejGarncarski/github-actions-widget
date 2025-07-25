"use client";

import { useGetActions } from "@/features/actions-list/api/get-actions";
import { SkeletonLoading } from "@/features/actions-list/components/skeleton-loading";
import { TimeElapsed } from "@/features/actions-list/components/time-elapsed";
import { ActionStatus, GitHubConclusion } from "@/schemas/actions";
import clsx from "clsx";
import { format, formatDuration, intervalToDuration } from "date-fns";
import {
  Calendar1Icon,
  Check,
  Clock3,
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
import { useInView } from "react-intersection-observer";

type Props = {
  repo: string | null;
  owner: string;
  token: string | null;
};

export const ActionsList = ({ owner, token, repo }: Props) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isRefetching,
  } = useGetActions({
    owner,
    token,
    repo: repo || "",
  });

  const { ref } = useInView({
    onChange: (isVisible) => {
      if (isVisible && hasNextPage) {
        fetchNextPage();
      }
    },
  });

  if (!repo) {
    return (
      <p className="mx-auto text-2xl backdrop-blur-2xl text-center w-fit my-10 px-6 py-3 rounded-lg shadow border border-white/20">
        Select repo first.
      </p>
    );
  }

  if (data?.pages[0]?.workflow_runs.length === 0) {
    return (
      <p className="mx-auto text-2xl backdrop-blur-2xl text-center w-fit my-10 px-6 py-3 rounded-lg shadow border border-white/20">
        There are no actions in selected repo.
      </p>
    );
  }

  if (isFetching && !isFetchingNextPage && !isRefetching) {
    return <SkeletonLoading />;
  }

  return (
    <div className="flex flex-col gap-4">
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
                updated_at,
                display_title,
                html_url,
              }) => {
                const runDate = new Date(run_started_at);

                const formattedStartDate = format(
                  runDate,
                  "EEEE d.MM.yy, HH:mm:ss"
                );

                const distance = formatDuration(
                  intervalToDuration({
                    start: runDate,
                    end: new Date(updated_at),
                  })
                );

                return (
                  <article
                    key={id}
                    className={clsx(
                      "flex flex-col gap-2 p-4 min-h-32 w-full border rounded-xl backdrop-blur-2xl backdrop-saturate-110 shadow transition-all duration-300",
                      conclusion
                        ? conclusionBorderColors[conclusion]
                        : statusBorderColors[status],
                      conclusion && conclusionBackgroundColors[conclusion]
                    )}
                  >
                    <div className="flex justify-between">
                      <a href={html_url} target="_blank">
                        <h2 className="text-xl font-bold">
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

                    <p className="flex items-center gap-2">
                      <Calendar1Icon size={16} /> {formattedStartDate}
                    </p>
                    {!conclusion && status === "in_progress" && (
                      <TimeElapsed initialDate={runDate} />
                    )}
                    {status === "completed" && (
                      <p className="flex items-center gap-2">
                        <Clock3 size={16} /> {distance}
                      </p>
                    )}
                    <p className="mt-auto text-stone-400 text-sm">{head_sha}</p>
                  </article>
                );
              }
            )}
          </Fragment>
        );
      })}
      {isFetchingNextPage && (
        <p className="p-6 rounded-xl backdrop-blur-2xl mx-auto w-full text-center bg-black/30  border-white/20 border">
          Fetching data...
        </p>
      )}
      <div ref={ref}></div>
    </div>
  );
};

const statusBorderColors: Record<ActionStatus, string> = {
  completed: "border-green-500/30",
  in_progress: "border-yellow-500/30",
  queued: "border-white/40",
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
  action_required: "border-orange-500/40",
  cancelled: "border-orange-500/40",
  failure: "border-red-500/40",
  neutral: "border-gray-500/40",
  skipped: "border-blue-500/40",
  stale: "border-blue-500/40",
  success: "border-green-500/40",
  timed_out: "border-orange-500/40",
};

const conclusionBackgroundColors: Record<GitHubConclusion, string> = {
  action_required: "bg-orange-500/25",
  cancelled: "bg-orange-700/25",
  failure: "bg-red-500/25",
  neutral: "bg-gray-500/25",
  skipped: "bg-blue-500/25",
  stale: "bg-blue-500/25",
  success: "bg-green-500/25",
  timed_out: "bg-orange-500/25",
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
