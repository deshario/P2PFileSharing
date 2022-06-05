import express from 'express';
import next from 'next';
import cors from 'cors';
import { initSocket } from './sockets';
import { NODE_ENV, PORT } from './config/environment';

import { getIpAddress } from './config/network';

const dev = NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './client' });
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();
  const app = express();

  app
    .use(cors())
    .use(express.urlencoded({ extended: true }))
    .use(express.static(__dirname))
    .use(express.json())
    .get('/slug', (req, res) => {
      const slug = Math.random().toString(36).substring(2, 9);
      res.status(200).json({ message: 'Success', data: { slug } });
    })
    .get('*', (req, res) => handle(req, res));

  const server = app.listen(PORT, () => {
    const ipAddress = getIpAddress();
    console.log('\x1b[33m\n Sever started 🚀🚀\x1b[0m');
    console.log('\x1b[33m=======================================\x1b[0m');
    console.log('\x1b[36m%s\x1b[0m', `  Local: http://localhost:${PORT}`);
    console.log('\x1b[36m%s\x1b[0m', `  Network: http://${ipAddress}:${PORT}`);
    console.log('\x1b[33m=======================================\x1b[0m');
  });

  initSocket(server);
})();
