import { Controller, HttpServerResponse, Inject, Post } from '@midwayjs/core';
import { PassportLocalMiddleware } from '../middleware/passport.local.middleware';
import { Context } from '@midwayjs/koa';

@Controller('/api/auth')
export class AuthController {
  @Inject()
  ctx: Context;

  @Post('/login', { middleware: [PassportLocalMiddleware] })
  async loginLocal() {
    this.ctx.session.userId = this.ctx.state.user.id;
    return new HttpServerResponse(this.ctx).success().json(this.ctx.state.user);
  }

  @Post('/logout', { middleware: [PassportLocalMiddleware] })
  async logout() {
    this.ctx.session.userId = null;
    return new HttpServerResponse(this.ctx).success().json({});
  }
}
