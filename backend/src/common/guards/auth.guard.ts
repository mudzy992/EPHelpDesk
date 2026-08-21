import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

/**
 * FAZA 1 (TASKS.md): JWT validacija preko MSAL/Azure AD tokena.
 * Trenutno je ovo tanak wrapper oko passport 'jwt' strategije koja se
 * registruje u AuthModule-u — implementacija strategije je zadatak Faze 1.
 */
@Injectable()
export class JwtAuthGuard extends PassportAuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
