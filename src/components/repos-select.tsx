import { fetcher } from "@/lib/fetcher";
import { reposSchema } from "@/schemas/repos";
import { cookies } from "next/headers";

export async function ReposSelect() {
  const appCookies = await cookies();
  const token = appCookies.get("PAT")?.value as string;

  const response = await fetcher({
    method: "GET",
    url: "https://api.github.com/user/repos",
    schema: reposSchema,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.isError) {
    return <p>cannot fetch repos</p>;
  }

  const sortedData = response.data.toSorted((a, b) => {
    if (a.updated_at && b.updated_at) {
      return new Date(a.updated_at) > new Date(b.updated_at) ? 1 : 0;
    }

    return 1;
  });

  return (
    <select className="text-red-500" name="repo">
      {sortedData.map((el) => {
        return (
          <option key={el.name} value={el.name}>
            {el.name}
          </option>
        );
      })}
    </select>
  );
}
