import { load, type CheerioAPI } from 'cheerio';

export interface Release {
  artist: string;
  title: string;
  label: string;
  cover?: string;
}

// class attribute targets
const ARTISTC = '.jw-artist';
const TITLEC = '.jw-title';
const LABELC = '.jw-label';
const COVERC = '.img-release img';

/**
 * Returns the cheerio object loaded with the current plain html text.
 * @param html - Plain html text.
 * @returns cheerio object.
 */
export function createCheerioInstance(html: string): CheerioAPI {
  return load(html);
}

/**
 * Returns an array of objects.
 * @param c - cheerio object.
 * @param className - class attribute target.
 * @returns array of objects with scraped releases.
 */
export function scrapeReleases(c: CheerioAPI, className: string): Release[] {
  const releases: Release[] = [];
  const nodes = c(className);

  nodes.each((_i, node) => {
    const artist = c(node)
      .find(ARTISTC)
      .text()
      .replace(/\s{2,}/g, ' ')
      .replace(/\n/g, '')
      .replace(/\s\/\s/g, ' / ')
      .trim();
    const title = c(node).find(TITLEC).text().replace(/\n/g, '').trim();
    const label = c(node).find(LABELC).text().trim();
    const cover = c(node).find(COVERC).attr('data-src');

    releases.push({ artist, title, label, cover });
  });

  return releases;
}
