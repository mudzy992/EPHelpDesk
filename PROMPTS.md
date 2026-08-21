# PROMPTS — gotovi promptovi po fazama

Kako koristiti:
1. Otvorite Cursor u root folderu projekta.
2. Za SVAKU fazu: **otvorite NOVI chat/agent session** (ne nastavljajte prethodni — prazan kontekst je jeftiniji i precizniji).
3. Kopirajte tačno tekst faze ispod (uključujući okvir), zalijepite kao prvu poruku.
4. Sačekajte da agent predloži plan (pravilo `plan-first` je u .cursor/rules), pregledajte, potvrdite sa "Idi" ili "Go", tek onda pustite da piše kod.
5. Kad završi: ručno testirajte (`npm run start:dev` / `npm run dev`), označite stavku `[x]` u `TASKS.md`, `git add . && git commit -m "..."`.
6. Pređite na sljedeću fazu — novi chat, sljedeći prompt odavde.

---

## FAZA 1 — Auth & Users

```
Radimo TASKS.md → Faza 1 (Auth & Users).

Prije pisanja koda: pročitaj docs/00-mvp-scope.md i backend/prisma/schema.prisma
(modeli User, Role, OrganizationalUnit), pa predloži kratak plan.

Cilj ove faze:
1. AuthModule (backend/src/modules/auth/): JWT strategija (passport-jwt) koja čita
   JWT_SECRET iz .env. Login endpoint koji za sada prima email i vraća JWT ako
   korisnik postoji u bazi (pravi Azure AD/MSAL login ide tek kad IT odjel dostavi
   Tenant ID/Client ID/Secret — do tada radimo sa email-based mock loginom, jasno
   označenim TODO komentarom gdje MSAL treba da uđe).
2. UsersModule: CRUD nad User modelom + endpoint za trenutnog korisnika (/users/me)
   koji koristi CurrentUser decorator.
3. OrganizationalUnitModule: CRUD + endpoint koji vraća cijelo stablo (parent/children)
   za dati root, i endpoint koji vraća sve pretke date OU (za OuAccessGuard kasnije).
4. Implementiraj RolesGuard (već postoji skeleton u common/guards/roles.guard.ts —
   provjeri da li već radi) i OuAccessGuard (trenutno pass-through — implementiraj
   pravu logiku: SUPER_ADMIN prolazi uvijek, ostali samo ako je resource.organizationalUnitId
   isti ili potomak korisnikove OU).
5. Registruj guardove globalno ili per-controller po potrebi (JwtAuthGuard na sve
   osim /auth/login).
6. Ne diraj TicketModule, GroupModule i ostale module van scope-a ove faze.

Kad završiš, ispiši kratku listu novih/izmijenjenih fajlova i predloži git commit poruku.
```

---

## FAZA 2 — Core Ticketing

```
Radimo TASKS.md → Faza 2 (Core Ticketing).

Prije pisanja koda: pročitaj docs/02-routing-logic.md (kritično za routing),
docs/01-domain-model.md, i backend/prisma/schema.prisma (Service, ServiceCategory,
Group, GroupMember, Ticket, RoutingRule). Predloži kratak plan.

Cilj ove faze:
1. ServiceModule: CRUD za Service i ServiceCategory.
2. GroupModule: CRUD za Group + dodavanje/uklanjanje članova (GroupMember).
3. TicketModule: create/read/update/list (sa filterima po statusu, originUnit,
   assignedGroup), promjena statusa kroz eksplicitan endpoint koji upisuje
   TicketActivity zapis tipa STATUS_CHANGE (koristi TicketActivityModule ako je
   praktičnije, ili direktan Prisma poziv iz TicketService — tvoja procjena, ali
   objasni izbor u planu).
4. TicketRoutingService (novi fajl u modules/ticket/): implementiraj TAČNO algoritam
   iz docs/02-routing-logic.md — originUnit+service lookup u RoutingRule, fallback
   na parent OU, pa default grupa + flag za review. Nemoj implementirati rule-engine
   (IF/THEN) — to je eksplicitno van opsega ove faze.
5. Endpoint za manuelnu dodjelu (assignment) — admin/agent postavlja assignedUserId.
6. Svi endpointi iza JwtAuthGuard + RolesGuard po potrebi (npr. kreiranje Service
   samo ADMIN/SUPER_ADMIN).
7. Ne implementiraj automatsku dodjelu (Least Busy/Round Robin) — to je Faza 6.

Kad završiš, ispiši listu fajlova i predloži git commit poruku.
```

---

## FAZA 3 — Activity, Time Tracking, Knowledge Base

```
Radimo TASKS.md → Faza 3 (Activity, Time Tracking, KB).

Pročitaj docs/00-mvp-scope.md (KB dio) i schema.prisma (TicketActivity,
TicketTimeLog, KnowledgeArticle, KnowledgeFeedback). Predloži kratak plan.

Cilj ove faze:
1. TicketActivityModule: endpoint za dodavanje komentara (tip COMMENT) na tiket,
   listanje aktivnosti po tiketu (uključujući i STATUS_CHANGE zapise iz Faze 2).
2. TimeTrackingModule: start/stop endpoint. KRITIČNO — trajanje (duration) se
   računa isključivo na backendu iz startedAt/endedAt, nikad se ne prima gotov
   broj sekundi sa frontenda. Dodaj i heartbeat endpoint koji, ako ne dobije poziv
   duže od konfigurabilnog X minuta (env varijabla), automatski zatvara sesiju
   (endedAt = zadnji heartbeat, ne "sada").
3. KnowledgeBaseModule: CRUD za KnowledgeArticle (samo ADMIN/AGENT mogu kreirati/
   editovati, isPublished flag), full-text search endpoint (koristi @@fulltext
   index koji već postoji u schema.prisma), feedback endpoint (isHelpful).
4. KB intercept flow: endpoint koji za dati serviceId + tekst upita vraća top N
   sličnih članaka — ovo se poziva SA FRONTENDA prije nego se dozvoli submit
   novog tiketa (frontend dio dolazi u Fazi 5, ovdje samo backend endpoint).

Kad završiš, ispiši listu fajlova i predloži git commit poruku.
```

---

## FAZA 4 — Notifikacije & Dashboard

```
Radimo TASKS.md → Faza 4 (Notifikacije & Dashboard).

Pročitaj docs/00-mvp-scope.md (KPI lista) i schema.prisma (Notification, AuditLog).
Predloži kratak plan.

Cilj ove faze:
1. NotificationModule: kreiranje Notification zapisa (in-app) na trigere: novi
   tiket, dodjela, novi komentar, promjena statusa na CLOSED. Email slanje preko
   O365 SMTP/Graph API — implementiraj interfejs/servis sa jasno odvojenom
   "send" metodom, ali ako SMTP kredencijali nisu u .env, samo loguj umjesto da
   baci grešku (da ne blokira dev rad bez pravih O365 podataka).
2. AuditModule: centralizovan servis (AuditService.log(action, entity, entityId,
   userId, metadata)) koji pozivaju drugi moduli za osjetljive akcije (status
   change, assignment, brisanje). Endpoint za listanje audit loga (samo
   SUPER_ADMIN).
3. Dashboard endpoint(i): broj tiketa po OU, prosječno vrijeme rješavanja
   (RESOLVED/CLOSED tiketi), opterećenje po agentu (broj dodijeljenih otvorenih
   tiketa), stopa "riješeno kroz KB" (koliko KB intercept poziva je rezultiralo
   NE-kreiranjem tiketa — ako ovo još ne pratimo, dodaj minimalan flag/tabelu za
   to, prvo predloži u planu prije nego implementiraš).
4. Poveži evente iz TicketModule/TicketActivityModule sa NotificationModule i
   AuditModule (event-driven, ne direktni pozivi — vidi .cursor/rules/backend.mdc).

Kad završiš, ispiši listu fajlova i predloži git commit poruku.
```

---

## FAZA 5 — Frontend integracija MVP-a

```
Radimo TASKS.md → Faza 5 (Frontend integracija).

Pročitaj frontend/src/router/index.tsx, frontend/src/store/auth.store.ts,
frontend/src/services/api.ts i sve backend endpointe napravljene u Fazama 1-4
(pogledaj *.controller.ts fajlove u backend/src/modules/). Predloži kratak plan
PRIJE nego počneš — ovo je najveća faza.

Cilj ove faze:
1. LoginPage: forma (email za sada, MSAL redirect dolazi kad Azure AD podaci
   stignu), poziva /auth/login, čuva token+user u auth.store, redirect na /.
2. Ruta zaštita u router/index.tsx: neulogovani → /login.
3. TicketsPage: lista tiketa (react-query), forma za kreiranje NOVOG tiketa koja
   PRIJE submit-a poziva KB intercept endpoint iz Faze 3 i prikazuje slične
   članke sa opcijom "Riješeno" (ne kreira tiket) / "Nije pomoglo" (nastavlja na
   kreiranje) — ovaj UX korak je obavezan, ne smije se preskočiti.
4. TicketDetailPage: detalji, lista aktivnosti/komentara, dugme za promjenu
   statusa, start/stop time tracking dugme.
5. AdminPage: tabovi za OrganizationalUnit (stablo prikaz), Group (CRUD +
   članovi), RoutingRule (CRUD) — samo vidljivo ADMIN/SUPER_ADMIN roli.
6. DashboardPage: kartice/grafovi sa KPI podacima iz Faze 4 dashboard endpointa.
7. Koristi components/ui/ (Radix + cn helper) za sve nove komponente, ne uvoditi
   novu UI biblioteku.

Radi stranicu po stranicu, ne sve odjednom — nakon svake javi status prije
prelaska na sljedeću.

Kad završiš, ispiši listu fajlova i predloži git commit poruku.
```

---

## FAZA 6 — Real-time, Edge ekstenzija, auto-dodjela (tek nakon MVP-a)

```
Radimo TASKS.md → Faza 6.

OVO JE VAN MVP-a — pokreni ovaj prompt samo ako je MVP (Faze 1-5) testiran i
prihvaćen. Pročitaj docs/03-edge-extension.md i .cursor/rules/websocket.mdc.
Predloži plan i PITAJ me da potvrdim obim prije pisanja koda, jer ova faza ima
tri nezavisna dijela (WebSocket chat, Edge ekstenzija, auto-assignment) — po
mogućnosti radimo ih kao tri odvojene pod-sesije, ne u jednom prompt-u.

1. WebSocket real-time: proširi TicketGateway (backend/src/modules/websocket/)
   kanalima user:{userId}, group:{groupId}, ticket:{ticketId}; poveži sa
   TicketActivityModule event-ima; frontend socket.io-client integracija.
2. Least Busy / Round Robin auto-assignment u TicketAssignmentService.
3. Edge ekstenzija (zaseban paket, van backend/frontend foldera) — samo ako
   eksplicitno tražim da počnemo ovaj dio.
```

---

## Napomena o budžetu
Ne pokrećite dvije faze u istom chatu čak i ako agent "ima još prostora" — svaki novi chat počinje čist, jeftiniji kontekst. Auto mode (bez ručnog biranja modela) koristite gdje god možete; ručno birani frontier model čuvajte za Fazu 2 (routing), Fazu 1 (guards/security) i Fazu 6 (WebSocket).
