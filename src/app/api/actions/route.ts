import { fetcher } from "@/lib/fetcher";
import { actionsSchema } from "@/schemas/actions";
import { getPAT } from "@/utils/cookie";
import { NextRequest } from "next/server";

const PER_PAGE = 5;

export async function GET(request: NextRequest) {
  const token = await getPAT();
  const searchParams = request.nextUrl.searchParams;
  const repo = searchParams.get("repo");
  const owner = searchParams.get("owner");
  const page = searchParams.get("page");
  const initialToken = request.headers.get("X-API-KEY");

  if (!(token || initialToken)) {
    return new Response(JSON.stringify({ message: "unauthorized" }), {
      status: 401,
    });
  }

  const response = await fetcher({
    method: "GET",
    url: `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=${PER_PAGE}&page=${page}`,
    schema: actionsSchema,
    headers: {
      Authorization: `Bearer ${initialToken}`,
    },
  });

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
