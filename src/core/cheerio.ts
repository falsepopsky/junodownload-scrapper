import * as cheerio from 'cheerio';
import { ARTISTCN, COVERCN, CSCN, LABELCN, NRCN, TITLECN } from './constants.js';

export interface Release {
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
export function loadHTML(html: string): cheerio.CheerioAPI {
  const $ = cheerio.load(html);
  return $;
}

/**
 * Returns an array of objects with releases.
 * @param c - cheerio object.
 * @param isNewRelease - boolean, if it's true return `new releases` otherwise `coming soon releases`.
 */
export function getReleases(c: cheerio.CheerioAPI, isNewRelease: boolean): Release[] {
  const releases: Release[] = [];
  let classname: string;

  isNewRelease ? (classname = NRCN) : (classname = CSCN);

  const scrapReleases = c(classname);

  scrapReleases.each((_i, release) => {
    const artist = c(release).find(ARTISTCN).text();
    const title = c(release).find(TITLECN).text();
    const label = c(release).find(LABELCN).text();
    const cover = c(release).find(COVERCN).attr('data-src');

    releases.push({ artist, title, label, cover });
  });

  return releases;
}
