import { getReleases, loadHTML, type Release } from './cheerio.js';
import { CSCLASSNAME, JUNOSITE, NRCLASSNAME } from './constants.js';
import { fetcher } from './fetcher.js';

/**
 * Returns an object with coming soon & new releases
 *
 */
export async function junoScrapper(): Promise<
  { comingSoon: Release[]; newReleases: Release[] } | undefined
> {
  const response = await fetcher(JUNOSITE);

  if (typeof response === 'string') {
    const cheerioLoaded = loadHTML(response);
    const comingSoon = getReleases(cheerioLoaded, CSCLASSNAME);
    const newReleases = getReleases(cheerioLoaded, NRCLASSNAME);

    return { comingSoon, newReleases };
  }
}
