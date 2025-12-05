import {
  Inject,
  Controller,
  Get,
  Query,
  HttpServerResponse,
  Patch,
  Body,
  Post,
  Del,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { PermissionGroupService } from '../service/permission-group.service';
import { Permission } from '../decorator/permission.decorator';
import {
  PermissionGroupListDTO,
  PermissionGroupCreateDTO,
  PermissionGroupUpdateDTO,
} from '../dto/permission-group.dto';

@Controller('/api/permission-groups')
export class PermissionGroupController {
  @Inject()
  ctx: Context;

  @Inject()
  permissionGroupService: PermissionGroupService;

  @Get('/')
  @Permission('permissionGroup:manage')
  async list(@Query() dto: PermissionGroupListDTO) {
    const permissionGroups = await this.permissionGroupService.list(dto);
    return new HttpServerResponse(this.ctx).success().json(permissionGroups);
  }

  @Get('/:id')
  @Permission('permissionGroup:manage')
  async getById(@Query('id') id: string) {
    const permissionGroup = await this.permissionGroupService.view(id);
    return new HttpServerResponse(this.ctx).success().json(permissionGroup);
  }

  @Post('/')
  @Permission('permissionGroup:manage')
  async create(@Body() dto: PermissionGroupCreateDTO) {
    const permissionGroup = await this.permissionGroupService.create(dto);
    return new HttpServerResponse(this.ctx).success().json(permissionGroup);
  }

  @Patch('/:id')
  @Permission('permissionGroup:manage')
  async updateById(
    @Query('id') id: string,
    @Body() dto: PermissionGroupUpdateDTO
  ) {
    const permissionGroup = await this.permissionGroupService.update(id, dto);
    return new HttpServerResponse(this.ctx).success().json(permissionGroup);
  }

  @Del('/:id')
  @Permission('permissionGroup:manage')
  async delete(@Query('id') id: string) {
    await this.permissionGroupService.delete(id);
    return new HttpServerResponse(this.ctx).success().json({});
  }
}
