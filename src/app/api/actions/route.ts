import { ACTIONS_PER_PAGE } from "@/constants/actions";
import { cookieConfig } from "@/constants/cookie";
import { fetcher } from "@/lib/fetcher";
import { actionsSchema } from "@/schemas/actions";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const appCookies = await cookies();
  const searchParams = request.nextUrl.searchParams;
  const repo = searchParams.get("repo");
  const owner = searchParams.get("owner");
  const page = searchParams.get("page");
  const token = request.headers.get("X-API-KEY");

  if (!token) {
    return new Response(JSON.stringify({ message: "unauthorized" }), {
      status: 401,
    });
  }

  const response = await fetcher({
    method: "GET",
    url: `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=${ACTIONS_PER_PAGE}&page=${page}`,
    schema: actionsSchema,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const rateLimitTotal = response.headers["x-ratelimit-limit"];
  const rateLimitUsed = response.headers["x-ratelimit-used"];
  const rateLimitReset = new Date(
    Number(response.headers["x-ratelimit-reset"]) * 1000
  );

  appCookies.set(
    "rateLimit",
    JSON.stringify({
      rateLimitReset,
      rateLimitTotal,
      rateLimitUsed,
    }),
    cookieConfig
  );

  if (response.isError) {
    return new Response(JSON.stringify({ message: "error" }), { status: 500 });
  }

  const sortedData = response.data.workflow_runs.toSorted((a, b) => {
    return (
      new Date(b.run_started_at).getTime() -
      new Date(a.run_started_at).getTime()
    );
  });

  const responseData = {
    total_count: response.data.total_count,
    workflow_runs: sortedData,
  };

  return Response.json(responseData);
}
