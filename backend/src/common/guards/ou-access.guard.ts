import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * FAZA 1 (TASKS.md): Admin vidi SAMO podatke svoje OU (i djece u hijerarhiji),
 * SuperAdmin vidi sve. Logika poređenja organizationalUnitId korisnika naspram
 * resursa se implementira ovdje — trenutno je ovo pass-through placeholder
 * da bi projekat kompajlirao prije Faze 1.
 */
@Injectable()
export class OuAccessGuard implements CanActivate {
  canActivate(_context: ExecutionContext): boolean {
    // TODO Faza 1: implementirati provjeru organizационе pripadnosti
    return true;
  }
}
