import { Guard, IGuard, getPropertyMetadata } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { PERMISSION_KEY } from '../decorator/permission.decorator';
import { checkPermission } from '../utils/permission';

@Guard()
export class PermissionGuard implements IGuard<Context> {
  async canActivate(
    context: Context,
    supplierClz: any,
    methodName: string
  ): Promise<boolean> {
    const requiredPermission = getPropertyMetadata(
      PERMISSION_KEY,
      supplierClz,
      methodName
    );

    if (!requiredPermission) {
      return true;
    }

    await checkPermission(context, requiredPermission);

    return true;
  }
}
