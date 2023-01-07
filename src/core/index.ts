import { getReleases, loadHTML, type Release } from './cheerio.js';
import { JUNOSITE } from './constants.js';
import { fetcher } from './fetcher.js';

type JunoRelease = 'Coming soon' | 'New releases';

/**
 * Returns a Map object with `Coming soon` & `New releases`
 */
export async function junoScrapper(): Promise<Map<JunoRelease, Release[]>> {
  const junoReleases: Map<JunoRelease, Release[]> = new Map();

  const response = await fetcher(JUNOSITE);
  const cheerioLoaded = loadHTML(response);
  const newReleases = getReleases(cheerioLoaded, true);
  const comingSoon = getReleases(cheerioLoaded, false);

  junoReleases.set('Coming soon', comingSoon);
  junoReleases.set('New releases', newReleases);

  return junoReleases;
}
