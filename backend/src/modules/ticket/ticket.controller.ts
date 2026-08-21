import { Controller } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  // TODO: endpoints se dodaju u fazi navedenoj za ovaj modul u TASKS.md
}
