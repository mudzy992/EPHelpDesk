# Domain Model — sažetak (pun izvor istine: backend/prisma/schema.prisma)

6 domena, već implementirano u schema.prisma:
1. **Organizational Structure** — `OrganizationalUnit` (self-referencing tree: DIRECTORATE → BRANCH → OFFICE → SECTOR → SERVICE)
2. **Identity & Access** — `User`, `Role`, `Group`, `GroupMember`
3. **Ticketing** — `Ticket`, `TicketActivity`, `TicketTimeLog`
4. **Knowledge Base** — `KnowledgeArticle`, `KnowledgeFeedback`
5. **Routing & Configuration** — `Service`, `ServiceCategory`, `RoutingRule`
6. **System & Audit** — `Notification`, `AuditLog`

Ključna odluka: OrganizationalUnit je JEDNA tabela za cijelu hijerarhiju preko `parentId`/`children` self-relacije. Nikad ne praviti zasebne tabele po nivou.

Schema je već primijenjena — agent NE treba ponovo generisati Prisma model, samo ga koristiti (`PrismaService` je već injektovan u svaki `*.service.ts`). Ako neki modul treba polje koje ne postoji u schema-i, prvo predloži izmjenu sheme i pitaj prije nego je primijeni.
