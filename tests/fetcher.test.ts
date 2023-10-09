import { fetcher } from '../src/fetcher.js';

describe('fetcher function', () => {
  test('throws an error when response.ok is not true', async () => {
    const urlStatusNotOK = 'https://www.junodownload.com/404';

    await expect(async () => await fetcher(urlStatusNotOK)).rejects.toThrow(Error);
  });

  test('returns text when response.ok is true', async () => {
    const urlStatusOK = 'https://www.junodownload.com/200';
    const text = await fetcher(urlStatusOK);
    expect(text).toBe('200 OK');
  });
});
