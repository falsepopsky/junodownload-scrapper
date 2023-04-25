import type Undici from 'undici';

declare global {
  export const fetch: typeof Undici.fetch;
}

export {};
