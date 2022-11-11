import * as cheerio from 'cheerio';
import { ARTISTCLASSNAME, IMAGECLASSNAME, LABELCLASSNAME, TITLECLASSNAME } from './constants.js';

export interface Release {
  artist?: string;
  title?: string;
  label?: string;
  cover?: string;
}

/**
 * Returns the cheerio object loaded with the current plain html text.
 *
 * @param html - Plain html text.
 * @returns cheerio object.
 */
export function loadHTML(html: string): cheerio.CheerioAPI {
  const $ = cheerio.load(html);
  return $;
}

/**
 * Returns an array of objects with release information.
 *
 * @param a - cheerio object.
 * @param classname - input of the classname to scrap.
 */
export function getReleases(a: cheerio.CheerioAPI, classname: string): Release[] {
  const releases: Release[] = [];
  const scrapReleases = a(classname);

  scrapReleases.each((_i, release) => {
    const artist = a(release).find(ARTISTCLASSNAME).text();
    const title = a(release).find(TITLECLASSNAME).text();
    const label = a(release).find(LABELCLASSNAME).text();
    const cover = a(release).find(IMAGECLASSNAME).attr('data-src');

    releases.push({ artist, title, label, cover });
  });

  return releases;
}
