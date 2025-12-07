import {
  Body,
  Controller,
  Get,
  HttpServerResponse,
  Inject,
  Post,
  Query,
} from '@midwayjs/core';
import { PassportLocalMiddleware } from '../middleware/passport.local.middleware';
import { Context } from '@midwayjs/koa';
import { newPasswordDTO, RegisterDTO } from '../dto/auth.dto';
import { UserService } from '../service/user.service';

@Controller('/api/auth')
export class AuthController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/login', { middleware: [PassportLocalMiddleware] })
  async loginLocal() {
    this.ctx.session.userId = this.ctx.state.user.id;
    return new HttpServerResponse(this.ctx).success().json(this.ctx.state.user);
  }

  @Get('/login')
  async getLogin() {
    return new HttpServerResponse(this.ctx).success().json(this.ctx.state.user);
  }

  @Post('/logout')
  async logout() {
    this.ctx.session.userId = null;
    return new HttpServerResponse(this.ctx).success().json({});
  }

  @Post('/register')
  async register(@Body() dto: RegisterDTO) {
    const user = await this.userService.create(dto);
    this.ctx.session.userId = user.id;
    return new HttpServerResponse(this.ctx).success().json({});
  }

  @Post('/send-code')
  async sendCode(@Query() _dto: newPasswordDTO) {
    return new HttpServerResponse(this.ctx).success().json({});
  }

  @Post('/new-password')
  async newPassword(@Query() _dto: newPasswordDTO) {
    return new HttpServerResponse(this.ctx).success().json({});
  }
}
