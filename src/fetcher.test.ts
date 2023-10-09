import { fetcher } from './fetcher.js';

describe('fetcher function', () => {
  test('throws an error when response.ok is not true', async () => {
    const urlStatusNotOK = 'https://httpstat.us/404';

    await expect(fetcher(urlStatusNotOK)).rejects.toThrow(Error);
  });

  test('returns text when response.ok is true', async () => {
    const urlStatusOK = 'https://httpstat.us/200';
    const text = await fetcher(urlStatusOK);
    expect(text).toBe('200 OK');
  });
});
