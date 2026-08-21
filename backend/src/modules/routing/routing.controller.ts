import { Controller } from '@nestjs/common';
import { RoutingService } from './routing.service';

@Controller('routing')
export class RoutingController {
  constructor(private readonly routingService: RoutingService) {}

  // TODO: endpoints se dodaju u fazi navedenoj za ovaj modul u TASKS.md
}
