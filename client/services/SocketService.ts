import { io, Socket } from 'socket.io-client';
import { socketURL } from '../config';

class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(socketURL);

    this.socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", this.socket.id);
    });
  }

  emitEvent = (event: string, payload: any): void => {
    if (!this.socket) {
      throw new Error('Socket connection not established');
    }else{
      console.log('this.socket',this.socket)
    }

    this.socket.emit(event, payload);
  }

  registerEvent = (event: string, callback: any): void => {
    this.socket.on(event, callback);
  }
}

export default new SocketService();
