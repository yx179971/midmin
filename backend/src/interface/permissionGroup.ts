import { Prisma } from '@gen/prisma/client';

export const SystemPermissionGroup = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
} as const;
export type SystemPermissionGroupType =
  (typeof SystemPermissionGroup)[keyof typeof SystemPermissionGroup];

export const PermissionGroupSelector = {
  get nano() {
    return {
      id: true,
      name: true,
    } satisfies Prisma.PermissionGroupSelect;
  },
  get list() {
    return {
      createdAt: true,
      updatedAt: true,
    } satisfies Prisma.PermissionGroupSelect;
  },
  get view() {
    return {
      ...this.list,
      permissions: true,
    } satisfies Prisma.PermissionGroupSelect;
  },
};
