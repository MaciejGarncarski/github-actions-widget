import z from "zod";

export const actionsSchema = z.object({
  total_count: z.number(),
  workflow_runs: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      status: z.enum(["completed", "in_progress", "queued"]),
    })
  ),
});
