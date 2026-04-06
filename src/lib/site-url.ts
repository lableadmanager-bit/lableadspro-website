const PROD_URL = "https://lableadspro.com";

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL;

  if (!envUrl) return PROD_URL;

  const withProtocol = envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;

  try {
    const url = new URL(withProtocol);

    if (
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname.endsWith(".local")
    ) {
      return PROD_URL;
    }

    return url.origin;
  } catch {
    return PROD_URL;
  }
}
