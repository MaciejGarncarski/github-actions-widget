"use client";

import { savePAT } from "@/actions/save-pat";
import { useActionState } from "react";

export function PATForm({ token }: { token: string }) {
  const [state, formAction, isPending] = useActionState(savePAT, "");

  return (
    <div>
      <form action={formAction} className="flex flex-col gap-4">
        <input
          type="password"
          defaultValue={token}
          name="PAT"
          className="border rounded-sm p-2 text-xl backdrop-blur-3xl bg-white text-black"
        />
        <button
          type="submit"
          className="border p-2 backdrop-blur-2xl rounded-md"
        >
          {isPending ? <p>Saving...</p> : "Save"}
        </button>
      </form>
      Status: {state}
    </div>
  );
}
