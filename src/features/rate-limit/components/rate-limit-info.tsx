import { RateLimitInfoClient } from "@/features/rate-limit/components/rate-limit-info-client";
import { rateLimitSchema } from "@/schemas/rate-limit";
import z from "zod";

export const RateLimitInfo = ({ rateLimitData }: { rateLimitData: string }) => {
  let data: null | z.infer<typeof rateLimitSchema> = null;

  try {
    const rateLimit = rateLimitSchema.safeParse(JSON.parse(rateLimitData));
    if (rateLimit.data) {
      data = rateLimit.data;
    }
  } catch {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="mx-auto text-lg backdrop-blur-2xl text-center w-full px-6 py-3 rounded-lg shadow border border-white/30">
      <RateLimitInfoClient
        rateLimitReset={data.rateLimitReset}
        rateLimitTotal={data.rateLimitTotal}
        rateLimitUsed={data.rateLimitUsed}
      />
    </div>
  );
};
