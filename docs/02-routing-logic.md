# Routing logika (kritično — čitaj prije diranja TicketRoutingService)

## MVP (basic mapping)
```
Ticket = (originUnitId + serviceId)
→ lookup u RoutingRule tabeli (unitId + serviceId → groupId; unique constraint već postoji u schema.prisma)
→ ako nema pravila: fallback na parent OU (traži pravilo gore u hijerarhiji preko parentId)
→ ako i dalje nema: dodijeli default IT grupi + flag za manuelni review
```

## Pravila pripadnosti korisnika
- Korisnik pripada OU na osnovu AD atributa (`company`, `department`) — mapiranje se radi u `UsersModule` prilikom sync-a (Faza 1), ne u `TicketModule`.
- Tiket se inicijalno vezuje za `originUnit` korisnika koji ga kreira (ne za OU agenta).

## Dodjela (assignment) u MVP-u
Manuelna — admin/agent preuzima tiket iz svoje grupe (`assignedGroupId` → `assignedUserId`). Least Busy / Round Robin automatska dodjela je Faza 6.

## Faza 6+ (rule-based engine — NE implementirati u MVP-u)
```
IF (OU + Service + Priority) THEN (Group + SLA + Priority override)
```
Zahtijeva prošireni RoutingRule model — ne dirati postojeći model dok se Faza 6 eksplicitno ne pokrene.
