import { Controller } from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';

@Controller('time-tracking')
export class TimeTrackingController {
  constructor(private readonly timeTrackingService: TimeTrackingService) {}

  // TODO: endpoints se dodaju u fazi navedenoj za ovaj modul u TASKS.md
}
