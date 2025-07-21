import { PATForm } from "@/components/pat-form";
import { fetcher } from "@/lib/fetcher";
import { userSchema } from "@/schemas/user";
import { getPAT } from "@/utils/cookie";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function SettingsPage() {
  const token = await getPAT();

  const response = await fetcher({
    method: "GET",
    url: "https://api.github.com/user",
    schema: userSchema,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <Suspense fallback={<p>loading</p>}>
      <main className="flex flex-col gap-8 max-w-5xl mx-auto">
        <Link href={"/"} className="flex gap-2 items-center">
          <ChevronLeft />
          Back
        </Link>
        <h1 className="text-5xl">Settings Page</h1>
        <PATForm token={token || ""} />
        {response.isError ? (
          <div>Failed to fetch user data.</div>
        ) : (
          <div>
            <h2>Account data</h2>
            <p>{response.data.name}</p>
            <p>{response.data.bio}</p>
            <p>{response.data.location}</p>
            <Image
              src={response.data.avatar_url}
              alt="user avatar"
              width={50}
              height={50}
              className="rounded-lg"
            />
          </div>
        )}
      </main>
    </Suspense>
  );
}
