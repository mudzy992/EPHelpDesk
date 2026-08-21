import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Vraća trenutno ulogovanog korisnika iz requesta.
 * Popunjava ga AuthGuard nakon validacije JWT-a (vidi Fazu 1 u TASKS.md).
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
