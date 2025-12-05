import { Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { LocalStrategy } from '../strategy/local.strategy';

@Middleware()
export class PassportLocalMiddleware extends PassportMiddleware(LocalStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {
      // failureRedirect: '/login',
    };
  }
  // resolve(): any {
  //   return super.resolve()
  // }
}
