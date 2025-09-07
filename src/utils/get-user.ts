import { fetcher } from "@/lib/fetcher";
import { userSchema } from "@/schemas/user";
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from "next/cache";

export async function getUser(PAT: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("user", PAT);

  return await fetcher({
    method: "GET",
    url: "https://api.github.com/user",
    schema: userSchema,
    next: { tags: ["user"] },
    headers: {
      Authorization: `Bearer ${PAT}`,
    },
  });
}
