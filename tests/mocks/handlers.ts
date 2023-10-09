import { rest, type RestHandler } from 'msw';
import { template } from './response.js';

export const handlers: RestHandler[] = [
  rest.get('https://www.junodownload.com/', async (_, res, ctx) => {
    return await res(ctx.status(200), ctx.text(template));
  }),
  rest.get('https://www.junodownload.com/200', async (_, res, ctx) => {
    return await res(ctx.status(200), ctx.text('200 OK'));
  }),
  rest.get('https://www.junodownload.com/404', async (_, res, ctx) => {
    return await res(ctx.status(400));
  }),
];
