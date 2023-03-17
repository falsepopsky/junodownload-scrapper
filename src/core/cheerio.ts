import type { CheerioAPI } from 'cheerio';
import { load } from 'cheerio';
import { ARTISTCN, COVERCN, CSCN, LABELCN, NRCN, TITLECN } from './constants.js';

interface Release {
  artist: string;
  title: string;
  label: string;
  cover?: string;
}

/**
 * Returns the cheerio object loaded with the current plain html text.
 * @param html - Plain html text.
 * @returns cheerio object.
 */
export function loadHTML(html: string): CheerioAPI {
  const $ = load(html);
  return $;
}

/**
 * Returns an array of objects.
 * @param c - cheerio object.
 * @param isNewRelease - boolean indicating whether to scrape new releases (`true`) or coming soon releases (`false`).
 * @returns an array of objects representing the scraped releases.
 */
export function getReleases(c: CheerioAPI, isNewRelease: boolean): Release[] {
  const releases: Release[] = [];
  let classname: string;

  isNewRelease ? (classname = NRCN) : (classname = CSCN);

  const nodes = c(classname);

  nodes.each((_i, node) => {
    const artist = c(node)
      .find(ARTISTCN)
      .text()
      .replace(/\s{2,}/g, ' ')
      .replace(/\n/g, '')
      .replace(/\s\/\s/g, ' / ')
      .trim();
    const title = c(node).find(TITLECN).text().replace(/\n/g, '').trim();
    const label = c(node).find(LABELCN).text().replace(/\n/g, '').trim();
    const cover = c(node).find(COVERCN).attr('data-src')?.replace(/\n/g, '').trim();

    releases.push({ artist, title, label, cover });
  });

  return releases;
}
