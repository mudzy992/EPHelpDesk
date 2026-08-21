import { Controller } from '@nestjs/common';
import { TicketActivityService } from './ticket-activity.service';

@Controller('ticket-activity')
export class TicketActivityController {
  constructor(private readonly ticketActivityService: TicketActivityService) {}

  // TODO: endpoints se dodaju u fazi navedenoj za ovaj modul u TASKS.md
}
