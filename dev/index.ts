import { junoScrapper } from '../dist/index.js';

async function start(): Promise<void> {
  try {
    const data = await junoScrapper();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

start().catch((err) => console.log(err));
