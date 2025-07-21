import { decrypt, encrypt } from "@/utils/encryption";
import { cookies } from "next/headers";

export const setPATCookie = async (value: string) => {
  const appCookies = await cookies();
  const encryptedValue = encrypt(value);

  appCookies.set("PAT", encryptedValue, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
};

export const getPAT = async () => {
  try {
    const appCookies = await cookies();
    const PAT = appCookies.get("PAT")?.value;

    if (!PAT) {
      return null;
    }

    return decrypt(PAT);
  } catch {
    return null;
  }
};
