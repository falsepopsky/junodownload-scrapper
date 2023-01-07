import { junoScrapper } from '../dist/index.js';

async function start(): Promise<void> {
  try {
    const data = await junoScrapper();
    console.log(data.get('New releases'));
    console.log(data.get('Coming soon'));
  } catch (err) {
    console.log(err);
  }
}

await start();
