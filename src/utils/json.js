export function parseJsonSafely(str, fallback = null) {
  if (typeof str !== "string" || str.length === 0) {
    return fallback;
  }
  try {
    const parsed = JSON.parse(str);
    return parsed == null ? fallback : parsed;
  } catch (e) {
    return fallback;
  }
}
