/**
 * Get a cookie value by name
 * @param name - The name of the cookie
 * @returns The cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }

  return null;
}

/**
 * Set a cookie
 * @param name - The name of the cookie
 * @param value - The value to store
 * @param maxAge - Max age in seconds (default: 1 year)
 */
export function setCookie(name: string, value: string, maxAge: number = 31536000): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=${value}; path=/; max-age=${maxAge}; SameSite=Strict`;
}

/**
 * Get the giveaway password from cookies
 * @param slug - The giveaway slug
 * @returns The password or null if not found
 */
export function getGiveawayPassword(slug: string): string | null {
  return getCookie(`giveaway_${slug}_password`);
}

/**
 * Set the giveaway password in cookies
 * @param slug - The giveaway slug
 * @param password - The password to store
 */
export function setGiveawayPassword(slug: string, password: string): void {
  setCookie(`giveaway_${slug}_password`, password);
}
