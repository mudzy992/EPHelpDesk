import { Module } from '@nestjs/common';
import { TicketActivityController } from './ticket-activity.controller';
import { TicketActivityService } from './ticket-activity.service';

@Module({
  controllers: [TicketActivityController],
  providers: [TicketActivityService],
  exports: [TicketActivityService],
})
export class TicketActivityModule {}
