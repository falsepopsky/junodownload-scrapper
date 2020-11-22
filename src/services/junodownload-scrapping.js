const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function scrappingFromWebsite(website) {
  try {
    const response = await fetch(website);
    const body = await response.text();
    const bodyCheerioObject = await cheerio.load(body);

    return bodyCheerioObject;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  scrappingFromWebsite,
};
