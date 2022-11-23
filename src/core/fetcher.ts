/**
 * Returns the HTML text from the website if there's no error.
 *
 * @param url - Input of the website
 */
export async function fetcher(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`There's something wrong with the website: ${res.status}`);
    }
    return await res.text();
  } catch (error) {
    console.error(error);
  }
}
