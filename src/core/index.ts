import { getReleases, loadHTML } from './cheerio.js';
import { JUNOSITE } from './constants.js';
import { fetcher } from './fetcher.js';

type JunoRelease = 'Coming soon' | 'New releases';

/**
 * Returns a Map object with `Coming soon` & `New releases`
 */
export async function junoScrapper(): Promise<Map<JunoRelease, ReturnType<typeof getReleases>>> {
  const junoReleases = new Map<JunoRelease, ReturnType<typeof getReleases>>();

  const response = await fetcher(JUNOSITE);
  const cheerioLoaded = loadHTML(response);
  const newReleases = getReleases(cheerioLoaded, true);
  const comingSoon = getReleases(cheerioLoaded, false);

  junoReleases.set('Coming soon', comingSoon);
  junoReleases.set('New releases', newReleases);

  return junoReleases;
}
