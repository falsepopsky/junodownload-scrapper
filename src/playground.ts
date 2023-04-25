import { junoScrapper } from './index.js';

async function main(): Promise<void> {
  const data = await junoScrapper();
  console.log(data);
}

await main();
