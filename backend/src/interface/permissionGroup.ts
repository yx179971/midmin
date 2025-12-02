export const SystemPermissionGroup = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
} as const;
export type SystemPermissionGroupType =
  (typeof SystemPermissionGroup)[keyof typeof SystemPermissionGroup];
