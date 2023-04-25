import { createCheerioInstance, scrapeReleases, type Release } from './cheerio.js';
import { fetcher } from './fetcher.js';

type JunoRelease = 'Coming soon' | 'New releases';

/**
 * Returns a Map object with `coming soon` & `new releases`
 */
export async function junoScrapper(): Promise<Map<JunoRelease, Release[]>> {
  const html = await fetcher('https://www.junodownload.com/');
  const cheerio = createCheerioInstance(html);
  const releases = new Map<JunoRelease, Release[]>();
  const newReleases = scrapeReleases(cheerio, '.home-top .jw-body .jw-container .jw-item');
  const comingSoon = scrapeReleases(cheerio, '.home-coming-soon .jw-body .jw-container .jw-item');

  releases.set('Coming soon', comingSoon);
  releases.set('New releases', newReleases);

  return releases;
}
