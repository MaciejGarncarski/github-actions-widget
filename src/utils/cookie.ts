import { cookieConfig } from "@/constants/cookie";
import { decrypt, encrypt } from "@/utils/encryption";
import { cookies } from "next/headers";
import z, { config } from "zod";

const configSchema = z.object({
  PAT: z.string().nullable(),
  selectedRepo: z.string().nullable().optional(),
});

const COOKIE_NAME = "APP_CONFIG";

type ConfigProps = {
  PAT?: string;
  selectedRepo?: string;
};

export const setConfig = async ({ PAT, selectedRepo }: ConfigProps) => {
  const appCookies = await cookies();
  const prevConfig = await getConfig();

  const newConfig = {
    selectedRepo: selectedRepo || prevConfig?.selectedRepo,
    PAT: PAT ? encrypt(PAT) : prevConfig?.PAT ? encrypt(prevConfig.PAT) : null,
  };

  appCookies.set(COOKIE_NAME, JSON.stringify(newConfig), cookieConfig);
};

export const getConfig = async (): Promise<z.infer<
  typeof configSchema
> | null> => {
  const appCookies = await cookies();
  const cookie = appCookies.get(COOKIE_NAME);

  try {
    if (!cookie?.value) {
      return null;
    }

    const configData = JSON.parse(decodeURIComponent(cookie.value));
    const parsed = configSchema.safeParse(configData);

    if (parsed.error) {
      return {
        selectedRepo: null,
        PAT: null,
      };
    }

    const decryptedPAT = decrypt(parsed.data.PAT || "");

    return {
      selectedRepo: parsed.data.selectedRepo,
      PAT: decryptedPAT,
    };
  } catch (e) {
    console.error(e);
    return {
      selectedRepo: null,
      PAT: null,
    };
  }
};
