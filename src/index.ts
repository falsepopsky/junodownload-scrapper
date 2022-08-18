import { JUNOSITE } from './utils/constants';
import { fetcher } from './utils/fetcher';

async function start() {
  const data = await fetcher(JUNOSITE);
  console.log(data);
}

start().catch((error) => console.error(error));
