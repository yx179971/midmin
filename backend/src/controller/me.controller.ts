import {
  Body,
  Controller,
  Get,
  HttpServerResponse,
  Inject,
  Patch,
} from '@midwayjs/core';
import { MeUpdateDTO, UserUpdatePwdDTO } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { Context } from '@midwayjs/koa';

@Controller('/api/me')
export class MeController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/')
  async view() {
    const user = await this.userService.view(this.ctx.state.user.id);
    return new HttpServerResponse(this.ctx).success().json(user);
  }

  @Patch('/')
  async update(@Body() dto: MeUpdateDTO) {
    const user = await this.userService.update(this.ctx.state.user.id, dto);
    return new HttpServerResponse(this.ctx).success().json(user);
  }

  @Patch('/password')
  async updatePassword(@Body() dto: UserUpdatePwdDTO) {
    const user = await this.userService.updatePassword(dto);
    return new HttpServerResponse(this.ctx).success().json(user);
  }
}
