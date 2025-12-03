import { httpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { SystemPermissionGroup } from '../interface/permissionGroup';

export async function checkPermission(
  ctx: Context,
  requiredPermission: string
) {
  if (!ctx.state.user) {
    throw new httpError.UnauthorizedError('未登录，请先登录');
  }

  if (!ctx.state.user.group) {
    throw new httpError.ForbiddenError('用户未分配权限组');
  }

  if (ctx.state.user.group.name !== SystemPermissionGroup.SUPER_ADMIN) {
    if (
      !(ctx.state.user.group.permissions || []).some(p =>
        requiredPermission.includes(p)
      )
    ) {
      throw new httpError.ForbiddenError('权限不足');
    }
  }
}
