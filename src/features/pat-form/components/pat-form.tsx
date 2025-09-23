"use client";

import { savePAT } from "@/features/pat-form/api/save-pat";
import clsx from "clsx";
import { useActionState } from "react";

export function PATForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(savePAT, "");

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input
        type="password"
        defaultValue={token}
        name="PAT"
        className={clsx(
          "border rounded-sm p-2 text-xl backdrop-blur-3xl text-black",
          state === "" && "bg-white",
          state === "invalid-token" && "border-red-500 bg-red-200/60",
          state === "error" && "border-red-500 bg-red-200/60",
          state === "success" && "border-green-500 bg-green-200/60"
        )}
      />
      <button
        type="submit"
        className="cursor-pointer bg-slate-300/10 border-white/20 border p-2 backdrop-blur-2xl rounded-md"
      >
        {isPending ? <p>Saving...</p> : "Save"}
      </button>
    </form>
  );
}
