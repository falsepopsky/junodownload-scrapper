const cron = require('node-cron');
const { scrappingFromWebsite } = require('./src/services/junodownload-scrapping');
const { getNewReleases, getComingSoonReleases } = require('./src/services/get-releases');
const { allObjects } = require('./src/services/download-images');
const { writeJsonFile } = require('./src/services/write-json-file');

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

cron.schedule(
  '59 15 * * 1',
  () => {
    console.log('Runing junodownload scrapper every monday at 15:59 hs.');
    start();
  },
  {
    scheduled: true,
    timezone: 'America/Argentina/Buenos_Aires',
  }
);

module.exports = { start };
