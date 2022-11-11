import { getReleases, loadHTML, type Release } from './cheerio.js';
import { COMINGSOON, JUNOSITE, NEWRELEASES } from './constants.js';
import { fetcher } from './fetcher.js';

export async function junoScrapper(): Promise<
  { csReleases: Release[]; nrRelease: Release[] } | undefined
> {
  const response = await fetcher(JUNOSITE);

  if (typeof response === 'string') {
    const cheerioLoaded = loadHTML(response);
    const csReleases = getReleases(cheerioLoaded, COMINGSOON);
    const nrRelease = getReleases(cheerioLoaded, NEWRELEASES);

    return { csReleases, nrRelease };
  }
}
