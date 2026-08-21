import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GroupService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: implementirati u fazi navedenoj za ovaj modul u TASKS.md
}
