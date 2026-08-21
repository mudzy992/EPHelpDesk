import { Controller } from '@nestjs/common';
import { OrganizationalUnitService } from './organizational-unit.service';

@Controller('organizational-unit')
export class OrganizationalUnitController {
  constructor(private readonly organizationalUnitService: OrganizationalUnitService) {}

  // TODO: endpoints se dodaju u fazi navedenoj za ovaj modul u TASKS.md
}
