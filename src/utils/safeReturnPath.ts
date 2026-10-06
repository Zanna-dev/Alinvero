export function safeReturnPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//") || /[\\\s]/.test(value)) return "/overview";
  try {
    const url = new URL(value, "https://alinvero.invalid");
    const allowed = /^\/(?:overview|dashboard|employees(?:\/(?:new|[1-9]\d*(?:\/edit)?))?|projects(?:\/(?:new|[1-9]\d*(?:\/(?:edit|tasks))?))?)?$/;
    if (url.origin !== "https://alinvero.invalid" || !allowed.test(url.pathname)) return "/overview";
    return url.pathname + url.search + url.hash;
  } catch { return "/overview"; }
}
