import { Controller } from '@nestjs/common';
import { ServiceService } from './service.service';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  // TODO: endpoints se dodaju u fazi navedenoj za ovaj modul u TASKS.md
}
