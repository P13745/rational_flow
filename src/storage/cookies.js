export function readCookie(name) {
  const encoded = `${encodeURIComponent(name)}=`;
  return document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(encoded))
    ?.slice(encoded.length) || "";
}

export function writeCookie(name, value, maxAgeDays = 3650) {
  const maxAge = Math.max(1, Math.floor(maxAgeDays * 86400));
  document.cookie = `${encodeURIComponent(name)}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
}
