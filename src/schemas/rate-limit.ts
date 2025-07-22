import z from "zod";

export const rateLimitSchema = z.object({
  rateLimitTotal: z.coerce.number(),
  rateLimitUsed: z.coerce.number(),
  rateLimitReset: z.iso.datetime().transform((value) => new Date(value)),
});
