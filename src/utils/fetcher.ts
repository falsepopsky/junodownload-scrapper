export async function fetcher(url: string) {
  try {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error('Failed to fetch website.');
    }
    return response.text();
  } catch (error) {
    console.error(error);
  }
}
