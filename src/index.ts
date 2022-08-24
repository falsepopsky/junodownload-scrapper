import { JUNOSITE } from './utils/constants.js';
import { fetcher } from './utils/fetcher.js';

async function start() {
  const data = await fetcher(JUNOSITE);
  console.log(data);
}

start().catch((error) => console.error(error));
