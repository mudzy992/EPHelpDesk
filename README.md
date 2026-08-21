# EP-HelpDesk — Setup

## 1. Baza (lokalno, preko Dockera)
```bash
docker compose up -d db
```
Ovo diže MariaDB na portu 3306 sa bazom `ephelpdesk` (user/pass: ephelpdesk/ephelpdesk).
Nemate Docker? Instalirajte MySQL/MariaDB ručno i samo prilagodite `DATABASE_URL`
u `backend/.env` (već je popunjen sa default vrijednostima koje odgovaraju
docker-compose.yml-u, ne morate ništa mijenjati ako koristite Docker).

## 2. Backend
```bash
cd backend
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```
Backend radi na `http://localhost:3000`. Seed kreira: 4 role, Direkciju + Sektor IKT,
prvog SuperAdmin-a (`superadmin@epbih.local`), i jedan osnovni servis.

## 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend radi na `http://localhost:5173`.

## 4. Provjera da je sve povezano
- `http://localhost:3000` treba da odgovori (NestJS je gore)
- `http://localhost:5173` treba da prikaže placeholder Dashboard stranicu
- `npx prisma studio` (u backend/) da vizuelno provjerite da li su tabele i seed podaci tu

## 5. Rad sa Cursor-om
1. Otvorite ovaj folder kao root projekta u Cursoru.
2. Pravila u `.cursor/rules/*.mdc` se učitavaju automatski.
3. Otvorite `PROMPTS.md`, kopirajte prompt za **FAZU 1** (Faza 0 — ovaj scaffold —
   je već gotova), zalijepite u NOVI chat.
4. Pratite tok: plan → potvrda → kod → test → git commit → sljedeći chat →
   sljedeća faza iz `PROMPTS.md`.
5. `TASKS.md` je vaš pregled napretka — ažurirajte `[x]` ručno nakon svake faze.

## Struktura
```
backend/     NestJS + Prisma + MySQL, 12 domenskih modula (skeleton, popunjava se po fazama)
frontend/    Vite + React + TS + Tailwind, router + 5 placeholder stranica
.cursor/rules/   Cursor pravila (auto-attached po tipu fajla)
docs/        Sažeti referentni dokumenti (agent ih čita umjesto punog SRS-a)
TASKS.md     Fazna checklist
PROMPTS.md   Gotovi promptovi za svaku fazu — copy/paste u novi chat
docker-compose.yml   Lokalna MariaDB baza za dev
```

## Budžetska napomena
Auto mode (uključen u Cursor Pro, ne troši kredite) za rutinu — CRUD, DTO-ove,
placeholder zamjene. Ručno biran frontier model čuvajte za: routing logiku
(Faza 2), guardove/security (Faza 1), WebSocket (Faza 6). Uvijek nova sesija po
fazi — vidi napomenu na dnu `PROMPTS.md`.
