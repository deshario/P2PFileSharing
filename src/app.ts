import express from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import { initSocket } from './sockets';

const app = express();
const port = 8000;
const server: Server = http.createServer(app);

app.use(cors());

initSocket(server);

app.get('/slug', (req, res) => {
  const slug = Math.random().toString(36).substring(2, 9);
  res.status(200).json({ message: 'Success', data: { slug } });
});

server.listen(port, () => {
  console.log(`> Server listening at port: ${port} <`);
});
