import { PATForm } from "@/features/pat-form/components/pat-form";
import { getConfig } from "@/utils/cookie";
import { getUser } from "@/utils/get-user";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function SettingsPage() {
  const config = await getConfig();

  let response = null;

  if (config?.PAT) {
    response = await getUser(config.PAT);
  }

  return (
    <main className="flex flex-col gap-8 max-w-3xl mx-auto">
      <header className="flex justify-between items-center">
        <h1 className="text-center text-2xl md:text-3xl font-bold">
          Settings Page
        </h1>
        <Link
          prefetch
          href={"/"}
          className="flex gap-2 items-center backdrop-blur-lg bg-white/10 px-3 py-2 rounded-lg border border-white/20"
        >
          <ChevronLeft size={18} />
          Back
        </Link>
      </header>
      <div className="p-6 backdrop-blur-lg rounded-xl border border-white/20 bg-white/10 flex flex-col gap-4">
        <h2 className="text-2xl">Token Settings</h2>
        <PATForm token={config?.PAT || ""} />
      </div>

      <div className="p-6 backdrop-blur-xl rounded-xl border border-white/20 bg-white/15">
        <h2 className="text-2xl">User Account Info</h2>
        {response && response.isError ? (
          <div>Failed to fetch user data.</div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex w-full justify-between items-center text-gray-600">
              <div>
                <p>{response?.data.name}</p>
                <p>{response?.data.bio}</p>
                <p>{response?.data.location}</p>
              </div>
              <Image
                src={response?.data.avatar_url || ""}
                alt="user avatar"
                width={80}
                height={80}
                quality={100}
                className="rounded-md aspect-square border border-black/10"
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
