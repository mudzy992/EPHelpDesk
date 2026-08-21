import { Controller } from '@nestjs/common';
import { KnowledgeBaseService } from './knowledge-base.service';

@Controller('knowledge-base')
export class KnowledgeBaseController {
  constructor(private readonly knowledgeBaseService: KnowledgeBaseService) {}

  // TODO: endpoints se dodaju u fazi navedenoj za ovaj modul u TASKS.md
}
