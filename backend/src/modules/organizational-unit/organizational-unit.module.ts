import { Module } from '@nestjs/common';
import { OrganizationalUnitController } from './organizational-unit.controller';
import { OrganizationalUnitService } from './organizational-unit.service';

@Module({
  controllers: [OrganizationalUnitController],
  providers: [OrganizationalUnitService],
  exports: [OrganizationalUnitService],
})
export class OrganizationalUnitModule {}
