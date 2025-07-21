import z from "zod";

const statusSchema = z.enum(["completed", "in_progress", "queued"]);

export type ActionStatus = z.infer<typeof statusSchema>;

export const GitHubConclusionEnum = z.enum([
  "action_required",
  "cancelled",
  "failure",
  "neutral",
  "success",
  "skipped",
  "stale",
  "timed_out",
]);

export type GitHubConclusion = z.infer<typeof GitHubConclusionEnum>;

export const actionsSchema = z.object({
  total_count: z.number(),
  workflow_runs: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      status: statusSchema,
      conclusion: GitHubConclusionEnum.nullable(),
      display_title: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      html_url: z.url(),
      head_sha: z.string(),
    })
  ),
});
