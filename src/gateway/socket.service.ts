import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  constructor() {}
  private readonly connectedClient: Map<string, Socket> = new Map();

  handleConnection(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClient.set(clientId, socket);
    socket.on('disconnect', () => {
      this.connectedClient.delete(clientId);
    });
  }
  handleDisconnect(socket: Socket): void {
    const clientId = socket.id;
    this.connectedClient.delete(clientId);
  }

  QRScanned(clientId: string, data: any): void {
    const client = this.connectedClient.get(clientId);
    if (client) {
      client.emit('QRScanned', data);
    }
  }

  handleJoinRoom(clientId: string, room: string): void {
    const client = this.connectedClient.get(clientId);
    if (client) {
      client.join(room);
    }
  }
}
