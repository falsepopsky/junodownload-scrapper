/**
 * Fetches the content of a given URL.
 *
 * @async
 * @param {string} url - The URL to fetch.
 * @returns {string} A Promise that resolves to the fetched content as a string.
 * @throws {Error} If the response status is not OK.
 */
export async function fetcher(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`There's something wrong with the website, error status: ${res.status}`);
  }
  return await res.text();
}
