import { CookieBanner } from "@/features/cookie-banner/components/cookie-banner";
import { cookies } from "next/headers";

export const CookieBannerContainer = async () => {
  const appCookies = await cookies();
  const cookiesAccepted = appCookies.get("cookiesAccepted")?.value === "true";

  return <CookieBanner accepted={cookiesAccepted} />;
};
