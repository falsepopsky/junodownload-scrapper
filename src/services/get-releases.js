const cheerio = require('cheerio');

async function getNewReleases(body) {
  const $ = await body;
  const classFromReleasesHTML = '.home-top .jw-body .jw-container .jw-item';
  const releases = $(classFromReleasesHTML);
  const scrapeResultsNR = [];

  releases.each((index, release) => {
    const urlImage = $(release).find('.img-release img').attr('data-src');
    const artist = $(release).find('.jw-artist').text();
    const title = $(release).find('.jw-title').text();
    const labelRecord = $(release).find('.jw-label').text();
    const scrapeResultRelease = { index, urlImage, artist, title, labelRecord };
    scrapeResultsNR.push(scrapeResultRelease);
  });

  return scrapeResultsNR;
}

async function getComingSoonReleases(body) {
  const $ = await body;
  const classFromComingSoonReleasesHTML = '.home-coming-soon .jw-body .jw-container .jw-item';
  const releases = $(classFromComingSoonReleasesHTML);
  const scrapeResultsCSR = [];

  releases.each((index, release) => {
    const urlImage = $(release).find('.img-release img').attr('data-src');
    const artist = $(release).find('.jw-artist').text();
    const title = $(release).find('.jw-title').text();
    const labelRecord = $(release).find('.jw-label').text();
    const scrapeResult = { index, urlImage, artist, title, labelRecord };
    scrapeResultsCSR.push(scrapeResult);
  });

  return scrapeResultsCSR;
}

module.exports = {
  getNewReleases,
  getComingSoonReleases,
};
