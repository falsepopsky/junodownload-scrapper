import { JUNOSITE } from './core/constants.js';
import { fetcher } from './core/fetcher.js';

async function start(): Promise<void> {
  const data = await fetcher(JUNOSITE);
  console.log(data);
}

start().catch((err) => console.log(err));
