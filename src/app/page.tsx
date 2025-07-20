import { ReposSelect } from "@/components/repos-select";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href={"/settings"}>settings</Link>

      <h1 className="text-center text-2xl md:text-3xl font-black">
        GitHub Actions Widget
      </h1>

      <ReposSelect />

      <article className="p-4 h-40 w-80 border border-white/10 rounded-xl backdrop-blur-4xl bg-white/15">
        Hello
      </article>
    </main>
  );
}
