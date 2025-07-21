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
  const initialToken = searchParams.get("initialToken");

  if (!token) {
    return new Response(JSON.stringify({ message: "unauthorized" }), {
      status: 401,
    });
  }

  const response = await fetcher({
    method: "GET",
    url: `https://api.github.com/repos/${owner}/${repo}/actions/runs?per_page=${PER_PAGE}&page=${page}`,
    schema: actionsSchema,
    headers: {
      Authorization: `Bearer ${token || initialToken}`,
    },
  });

  if (response.isError) {
    return new Response(JSON.stringify({ message: "error" }), { status: 500 });
  }

  return Response.json(response.data);
}
