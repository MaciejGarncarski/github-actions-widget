import { rateLimitSchema } from "@/schemas/rate-limit";
import { format } from "date-fns";

export const RateLimitInfo = async ({
  rateLimitData,
}: {
  rateLimitData: string;
}) => {
  const rateLimit = rateLimitSchema.safeParse(JSON.parse(rateLimitData));

  if (!rateLimit.data) {
    return null;
  }

  return (
    <div className="mx-auto text-lg backdrop-blur-2xl text-center w-full px-6 py-3 rounded-lg shadow border border-white/30">
      <p>
        API Limits: {rateLimit.data.rateLimitUsed} /{" "}
        {rateLimit.data.rateLimitTotal}
      </p>
      <p>
        Limit reset:{" "}
        {format(rateLimit.data.rateLimitReset, "EEEE d.MM.yyyy, HH:mm:ss")}
      </p>
    </div>
  );
};
