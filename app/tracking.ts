const trackingStorageKey = "agk_landing_tracking_params";
const trackingCookieKey = "agk_landing_tracking";
const trackingMaxAge = 60 * 60 * 24 * 90;

function shouldKeepTrackingParam(key: string) {
  const normalized = key.toLowerCase();

  return (
    normalized.startsWith("utm_") ||
    normalized.startsWith("gc") ||
    normalized === "_gl" ||
    normalized === "fbclid" ||
    normalized === "gclid" ||
    normalized === "gbraid" ||
    normalized === "wbraid" ||
    normalized === "yclid" ||
    normalized === "ymclid" ||
    normalized === "roistat" ||
    normalized === "openstat" ||
    normalized === "rs" ||
    normalized === "ref" ||
    normalized === "referer" ||
    normalized === "source"
  );
}

function paramsToRecord(params: URLSearchParams) {
  const tracked: Record<string, string> = {};

  params.forEach((value, key) => {
    if (value && shouldKeepTrackingParam(key)) {
      tracked[key] = value;
    }
  });

  return tracked;
}

function readTrackingFromCookie() {
  if (typeof document === "undefined") return {};

  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${trackingCookieKey}=`));

  if (!cookie) return {};

  try {
    return JSON.parse(decodeURIComponent(cookie.split("=").slice(1).join("="))) as Record<string, string>;
  } catch {
    return {};
  }
}

export function saveTrackingParamsFromLocation() {
  if (typeof window === "undefined") return;

  const incoming = paramsToRecord(new URLSearchParams(window.location.search));
  if (!Object.keys(incoming).length) return;

  const saved = getSavedTrackingParams();
  const next = { ...saved, ...incoming };
  const encoded = encodeURIComponent(JSON.stringify(next));

  try {
    window.localStorage.setItem(trackingStorageKey, JSON.stringify(next));
  } catch {
    // Some privacy modes block storage; cookies still give the widget a fallback.
  }

  try {
    document.cookie = `${trackingCookieKey}=${encoded}; path=/; max-age=${trackingMaxAge}; SameSite=Lax`;
  } catch {
    // Do not let tracking storage failures break registration buttons.
  }
}

export function getSavedTrackingParams() {
  if (typeof window === "undefined") return {};

  try {
    const saved = window.localStorage.getItem(trackingStorageKey);
    if (saved) return JSON.parse(saved) as Record<string, string>;
  } catch {
    return readTrackingFromCookie();
  }

  return readTrackingFromCookie();
}

export function addTrackingParamsToUrl(url: string) {
  if (typeof window === "undefined") return url;

  const tracked = getSavedTrackingParams();
  const current = paramsToRecord(new URLSearchParams(window.location.search));
  const params = { ...tracked, ...current };
  const nextUrl = new URL(url, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (!nextUrl.searchParams.has(key)) {
      nextUrl.searchParams.set(key, value);
    }
  });

  if (!nextUrl.searchParams.has("ref")) {
    nextUrl.searchParams.set("ref", document.referrer);
  }

  if (!nextUrl.searchParams.has("loc")) {
    nextUrl.searchParams.set("loc", window.location.href);
  }

  try {
    const clarityData = (window as typeof window & { clrtQueryData?: unknown }).clrtQueryData;
    if (clarityData && !nextUrl.searchParams.has("clrtQueryData")) {
      nextUrl.searchParams.set("clrtQueryData", JSON.stringify(clarityData));
    }
  } catch {
    return nextUrl.toString();
  }

  return nextUrl.toString();
}
