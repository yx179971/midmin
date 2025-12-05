import { PermissionGroupSelector } from './permissionGroup';
import { Prisma } from '@gen/prisma/client';

export const UserStatus = {
  mustChangePwd: 'mustChangePwd',
} as const;
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export const UserSelector = {
  get list() {
    return {
      id: true,
      username: true,
      avatar: true,
      email: true,
      mobile: true,
      failCount: true,
      lockUntil: true,
      groupId: true,
      group: {
        select: PermissionGroupSelector.nano,
      },
      lastLoginAt: true,
      createdAt: true,
      updatedAt: true,
    } satisfies Prisma.UserSelect;
  },
  get view() {
    return {
      ...this.list,
      bio: true,
    } satisfies Prisma.UserSelect;
  },
};
