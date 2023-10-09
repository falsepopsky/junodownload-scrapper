import { setupServer, type SetupServer } from 'msw/node';
import { handlers } from './handlers.js';

export const server: SetupServer = setupServer(...handlers);
