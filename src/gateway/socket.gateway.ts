import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;
  private clients = new Map<string, Socket>();

  onModuleInit() {
    this.server.on('connection', (socket) => {
      this.clients.set(socket.id, socket);
      console.log(`Emitting socketId event to client ${socket.id}`);
      this.server.emit('socketId', socket.id);
      socket.on('disconnect', () => {
        this.clients.delete(socket.id);
      });

      socket.on('join', (data) => {
        console.log(data);
        socket.join(data.room);
      });
    });
  }

  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() body, @ConnectedSocket() client: Socket) {
    console.log('Client ID:', client.id);
    console.log(body);
    this.server.emit('onMessage', {
      message: body,
    });
  }

  @SubscribeMessage('messageToClient')
  sendMessageToClient(clientId: string, message: any) {
    const client = this.clients.get(clientId);
    if (client) {
      client.emit('message', message);
    } else {
      console.log(`No client with ID ${clientId}`);
    }
  }

  // Implement other Socket.IO event handlers and message handlers
}
