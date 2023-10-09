import { createCheerioInstance, scrapeReleases } from '../src/cheerio.js';
import { template } from './mocks/response.js';

const HTMLTEMPLATE = `<html><body><h1 class='example-class'>Hello, World!</h1></body></html>`;

describe('createCheerioInstance method', () => {
  test('returns a CheerioAPI object', () => {
    const $ = createCheerioInstance(HTMLTEMPLATE);
    expect($('.example-class').text()).toBe('Hello, World!');
    expect($('h1').text()).toBe('Hello, World!');
  });
});

describe('Get Releases', () => {
  const $ = createCheerioInstance(template);
  const NRC = '.home-top .jw-body .jw-container .jw-item';
  const CSC = '.home-coming-soon .jw-body .jw-container .jw-item';

  it('should return an array of new releases objects', () => {
    const result = scrapeReleases($, NRC);

    expect(result[1]?.artist).toBe('Insider');
    expect(result[1]?.title).toBe('Something Flash');
    expect(result[1]?.label).toBe('R&S');
    expect(result[1]?.cover).toBe('https://imagescdn.junodownload.com/300/CS5807345-02A-MED.jpg');
    expect(result[4]?.artist).toBe('Voice Of Art / Kenneth Bager / Troels Hammer / Dj Divo / Olio / Claus Hojensgard');
  });

  it('should return an array of coming soon releases objects', () => {
    const result = scrapeReleases($, CSC);

    expect(result[0]?.artist).toBe('Nine Windows');
    expect(result[0]?.title).toBe('Rule Of Thirds');
    expect(result[1]?.label).toBe('7AGE Music');
    expect(result[2]?.cover).toBe('https://imagescdn.junodownload.com/300/CS5533563-02A-MED.jpg');
    expect(result[4]?.artist).toBe('Various');
  });
});
