import { httpError, Inject, Provide } from '@midwayjs/core';
import { prisma, transformOrderBy } from '../lib/prisma';
import {
  PermissionGroupListDTO,
  PermissionGroupUpdateDTO,
} from '../dto/permission-group.dto';
import { PermissionGroupSelector } from '../interface';
import { Context } from '@midwayjs/koa';

@Provide()
export class PermissionGroupService {
  @Inject()
  ctx: Context;

  async list(dto: PermissionGroupListDTO) {
    const { keyword, orderBy, page, pageSize } = dto;
    const where = {
      ...(keyword ? { name: { contains: keyword } } : {}),
    };
    const [permissionGroups, total] = await Promise.all([
      prisma.permissionGroup.findMany({
        where: where,
        select: PermissionGroupSelector.list,
        ...(page > 0 ? { skip: (page - 1) * pageSize } : {}),
        ...(pageSize > 0 ? { take: pageSize } : {}),
        orderBy: transformOrderBy(orderBy),
      }),
      prisma.permissionGroup.count({ where }),
    ]);
    return {
      list: permissionGroups,
      total,
    };
  }

  async view(id: string) {
    return prisma.permissionGroup.findFirst({
      where: { id },
      select: PermissionGroupSelector.view,
    });
  }

  async create(dto: PermissionGroupUpdateDTO) {
    if (await prisma.permissionGroup.findFirst({ where: { name: dto.name } })) {
      throw new httpError.BadRequestError(`权限组${dto.name}已存在`);
    }
    const { ...data } = dto;
    return prisma.permissionGroup.create({
      data,
      select: PermissionGroupSelector.view,
    });
  }

  async update(id: string, dto: PermissionGroupUpdateDTO) {
    if (await prisma.permissionGroup.findFirst({ where: { name: dto.name } })) {
      throw new httpError.BadRequestError(`权限组${dto.name}已存在`);
    }
    const { ...data } = dto;
    return prisma.permissionGroup.update({
      where: { id },
      data,
      select: PermissionGroupSelector.view,
    });
  }

  async delete(id: string) {
    await prisma.permissionGroup.delete({
      where: { id },
    });
  }
}
