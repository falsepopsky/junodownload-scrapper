const { scrappingFromWebsite } = require('./services/junodownload-scrapping');
const { getNewReleases, getComingSoonReleases } = require('./services/get-releases');
const { allObjects } = require('./services/download-images');
const { writeJsonFile } = require('./services/write-json-file');

const website = 'https://www.junodownload.com/';

async function start() {
  const scrapedWebsite = await scrappingFromWebsite(website);
  const newReleases = await getNewReleases(scrapedWebsite);
  const comingSoonReleases = await getComingSoonReleases(scrapedWebsite);
  const downloadNewReleasesImages = await allObjects(newReleases);
  const downloadComingSoonReleasesImages = await allObjects(comingSoonReleases);
  const makeJSONFileForCSR = await writeJsonFile(newReleases);
  const makeJSONFileForNR = await writeJsonFile(comingSoonReleases);
}

start();

module.exports = { start };
