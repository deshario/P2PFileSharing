import express from 'express'
import next from 'next';

import cors from 'cors';
import { initSocket } from './sockets';
import http, { createServer, Server } from "http";
import { NODE_ENV, PORT } from "./config/environment"

const dev = NODE_ENV !== 'production';
const nextApp = next({ dev, dir: "./client" });
const handle = nextApp.getRequestHandler();

(async () => {
  await nextApp.prepare();
  const app = express();

  const server: Server = http.createServer(app);
  initSocket(server);

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

  const httpServer = createServer(app);

  httpServer.listen(PORT, (): void => {
    console.log(`> Server listening at port: ${PORT} <`);
  });

})();