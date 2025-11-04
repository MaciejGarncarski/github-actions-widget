import Link from "next/link";

export const PatError = () => {
  return (
    <div className="text-center p-6 w-full bg-primary border border-slate-400/20 text-orange-300 rounded-lg mx-auto flex flex-col gap-4">
      <p>
        Cannot fetch repos, please provide valid PERSONAL ACCESS TOKEN in{" "}
        <Link href="/settings" className="underline" prefetch>
          settings
        </Link>
        .
      </p>
      <div className="flex gap-4 justify-center">
        <a href="pat-permissions.png" target="_blank" className="underline">
          Needed Permissions
        </a>
        <a
          href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token"
          target="_blank"
          className="underline"
        >
          How to create Personal Access Tokens
        </a>
      </div>
    </div>
  );
};
