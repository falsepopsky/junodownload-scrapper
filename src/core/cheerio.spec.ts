import { describe, expect, it, test } from '@jest/globals';
import { loadHTML } from './cheerio.js';

describe('loadHTML', () => {
  it('returns a CheerioStatic object', () => {
    const html = `<html><body><h1 class='example-class'>Hello, World!</h1></body></html>`;
    const result = loadHTML(html);
    expect(result).toBeInstanceOf(Object);
  });

  test('returns a CheerioAPI object with the expected element', () => {
    const html = `<html><body><h1 class='example-class'>Hello, World!</h1></body></html>`;
    const $ = loadHTML(html);
    const text = $('.example-class').text();
    expect(text).toBe('Hello, World!');
    expect(text).not.toBe('hello');
  });
});
