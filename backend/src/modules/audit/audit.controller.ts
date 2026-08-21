import { Controller } from '@nestjs/common';
import { AuditService } from './audit.service';

@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  // TODO: endpoints se dodaju u fazi navedenoj za ovaj modul u TASKS.md
}
