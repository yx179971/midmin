import {
  Inject,
  Controller,
  Get,
  Query,
  HttpServerResponse,
  Patch,
  Body,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { Permission } from '../decorator/permission.decorator';
import { UserListDTO, UserUpdateDTO } from '../dto/user.dto';

@Controller('/api/users')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/')
  @Permission('user:manage')
  async list(@Query() dto: UserListDTO) {
    const users = await this.userService.list(dto);
    return new HttpServerResponse(this.ctx).success().json(users);
  }

  @Get('/:id')
  @Permission('user:manage')
  async getById(@Query('id') id: string) {
    const user = await this.userService.view(id);
    return new HttpServerResponse(this.ctx).success().json(user);
  }

  @Patch('/:id')
  @Permission('user:manage')
  async updateById(@Query('id') id: string, @Body() dto: UserUpdateDTO) {
    const user = await this.userService.update(id, dto);
    return new HttpServerResponse(this.ctx).success().json(user);
  }

  @Get('/:id/reset-password')
  @Permission('user:manage')
  async resetPassword(@Query('id') id: string) {
    const password = await this.userService.resetPassword(id);
    return new HttpServerResponse(this.ctx).success().json({ password });
  }
}
