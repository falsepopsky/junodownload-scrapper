import * as cheerio from 'cheerio';

export function LoadHTML(html: string): cheerio.CheerioAPI {
  const $ = cheerio.load(html);
  return $;
}
