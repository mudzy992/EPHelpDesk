import { Module } from '@nestjs/common';
import { TicketGateway } from './ticket.gateway';

@Module({
  providers: [TicketGateway],
  exports: [TicketGateway],
})
export class WebsocketModule {}
