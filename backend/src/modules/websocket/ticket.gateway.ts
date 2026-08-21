import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

/**
 * FAZA 6 (TASKS.md): real-time kanali user:{userId}, group:{groupId}, ticket:{ticketId}.
 * Servisi NIKAD ne šalju direktno preko socketa — samo emituju evente,
 * gateway sluša i prosljeđuje (vidi .cursor/rules/websocket.mdc).
 */
@WebSocketGateway({ cors: true })
export class TicketGateway {
  @WebSocketServer()
  server: Server;
}
