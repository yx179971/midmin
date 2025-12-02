import { savePropertyMetadata } from '@midwayjs/core';

export const PERMISSION_KEY = 'decorator:permission';

export function Permission(permission: string) {
  return (target: any, key?: string, descriptor?: any) => {
    savePropertyMetadata(PERMISSION_KEY, permission, target, key);
  };
}
