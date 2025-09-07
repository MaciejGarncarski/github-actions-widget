import { CookieBanner } from "@/features/cookie-banner/components/cookie-banner";
import { cookies } from "next/headers";

export const CookieBannerContainer = async () => {
  const appCookies = await cookies();
  const cookie = appCookies.get("cookiesAccepted");

  const cookiesAccepted = cookie?.value ? cookie.value === "true" : false;

  return <CookieBanner accepted={cookiesAccepted} />;
};
