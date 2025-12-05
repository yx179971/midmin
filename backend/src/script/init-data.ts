import { Autoload, Init, Scope, ScopeEnum } from '@midwayjs/core';
import { prisma } from '../lib/prisma';
import * as bcrypt from 'bcrypt';
import { SystemPermissionGroup } from '../interface/permissionGroup';

@Autoload()
@Scope(ScopeEnum.Singleton)
export class InitData {
  @Init()
  async init() {
    if ((await prisma.user.count()) === 0) {
      await prisma.$transaction(async tx => {
        const superAdminGroup = await tx.permissionGroup.create({
          data: {
            name: SystemPermissionGroup.SUPER_ADMIN,
            permissions: ['*'],
          },
          select: {
            id: true,
          },
        });
        const adminGroup = await tx.permissionGroup.create({
          data: {
            name: SystemPermissionGroup.ADMIN,
            permissions: ['user:manage', 'permissionGroup:manage'],
          },
          select: {
            id: true,
          },
        });

        await tx.user.createMany({
          data: [
            {
              username: 'superadmin',
              password: await bcrypt.hash('superadmin!@#', 8),
              groupId: superAdminGroup.id,
            },
            {
              username: 'admin',
              password: await bcrypt.hash('admin!@#', 8),
              groupId: adminGroup.id,
            },
          ],
        });
      });
    }
  }
}
