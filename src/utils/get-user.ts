import { fetcher } from "@/lib/fetcher";
import { userSchema } from "@/schemas/user";
import { cacheLife, cacheTag } from "next/cache";

export async function getUser(PAT: string) {
  "use cache: remote";
  cacheLife("minutes");
  cacheTag("user", PAT);

  const response = await fetcher({
    method: "GET",
    url: "https://api.github.com/user",
    schema: userSchema,
    next: { tags: ["user"] },
    headers: {
      Authorization: `Bearer ${PAT}`,
    },
  });

  return response;
}
