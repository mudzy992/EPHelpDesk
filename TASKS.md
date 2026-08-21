# TASKS — EP-HelpDesk

Pravilo: uvijek radi SAMO stavku označenu `[~] IN PROGRESS`. Kad je gotova: označi `[x]`, commituj, pa TEK ONDA otvori NOVI Cursor chat za sljedeću stavku (novi chat = prazan kontekst = jeftinije i preciznije).

Gotov prompt za svaku stavku je u `PROMPTS.md` — kopiraj-zalijepi, ne piši ručno.

## Faza 0 — Setup ✅ GOTOVO (scaffold isporučen)
- [x] NestJS + Prisma + MySQL projekat inicijalizovan
- [x] Kompletna Prisma šema (svih 6 domena, sve relacije)
- [x] Vite + React + TS + Tailwind frontend inicijalizovan
- [x] .env / .env.example, .gitignore, docker-compose za lokalnu bazu
- [ ] VI radite ručno: `npm install` (backend i frontend), `docker compose up -d db`, `npx prisma migrate dev --name init`, `npx prisma db seed`

## Faza 1 — Auth & Users
- [~] IN PROGRESS — AuthModule: JWT strategija + login endpoint (mock AD dok ne stignu pravi Azure AD podaci), UsersModule: sync/CRUD, OrganizationalUnitModule: CRUD + tree helpers, RolesGuard + OuAccessGuard implementacija

## Faza 2 — Core Ticketing
- [ ] ServiceModule + ServiceCategory CRUD
- [ ] GroupModule (handler timovi + članstvo)
- [ ] TicketModule: create/read/update, statusi
- [ ] TicketRoutingService — basic mapping (vidi docs/02-routing-logic.md)
- [ ] Manuelna dodjela (assignment)

## Faza 3 — Activity, Time Tracking, KB
- [ ] TicketActivityModule (komentari + audit)
- [ ] TimeTrackingModule (start/stop + backend heartbeat)
- [ ] KnowledgeBaseModule (CRUD + full-text search)
- [ ] KB intercept flow (backend + frontend)

## Faza 4 — Notifikacije & Dashboard
- [ ] NotificationModule (email O365 + in-app)
- [ ] AuditModule (centralizovan log)
- [ ] Dashboard KPI endpoint-i

## Faza 5 — Frontend integracija MVP-a
- [ ] Login flow (MSAL na frontend-u) + ruta zaštita
- [ ] Ticket create/list/detail ekrani (zamjena placeholder stranica)
- [ ] Admin ekrani (routing rules, grupe, OU)
- [ ] Dashboard ekran

## Faza 6 (nakon MVP-a — poseban sprint)
- [ ] WebSocket real-time chat
- [ ] Edge ekstenzija (docs/03-edge-extension.md)
- [ ] Automatska dodjela (Least Busy/Round Robin)

---
**Trenutni status:** Faza 0 gotova. Sljedeći korak: uradite ručne komande iz Faze 0, zatim otvorite novi Cursor chat i zalijepite prompt "FAZA 1" iz `PROMPTS.md`.
