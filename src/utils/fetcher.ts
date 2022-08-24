export async function fetcher(url: string): Promise<Response | undefined> {
  try {
    const response = await fetch(url);
    return response;
  } catch (error) {
    console.error(error);
  }
}
