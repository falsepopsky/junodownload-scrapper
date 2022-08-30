export async function fetcher(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("There's something wrong with the website");
    }
    return await res.text();
  } catch (error) {
    console.error(error);
  }
}
