import { Guard, httpError, IGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { prisma } from '../lib/prisma';
import { UserStatus } from '../interface';

@Guard()
export class AuthGuard implements IGuard<Context> {
  async canActivate(
    context: Context,
    _supplierClz: any,
    _methodName: string
  ): Promise<boolean> {
    if (context.session.userId) {
      const user = await prisma.user.findUnique({
        where: {
          id: context.session.userId,
        },
        include: {
          group: true,
        },
      });
      if (user) {
        delete user.password;
        context.state.user = user;
        if (user.status === UserStatus.mustChangePwd) {
          context.redirect('/me/update-password');
          return false;
        }
        return true;
      }
    }
    if (this.isPublicApi(context)) {
      return true;
    }
    throw new httpError.UnauthorizedError('未登录，请先登录');
  }

  isPublicApi(context: Context): boolean {
    const publicPaths = [
      '/', // 根路径
      '/api/health', // 健康检查
      '/api/auth/login', // 登录
      '/api/auth/register', // 注册
      '/api/auth/send-code', // 发送短信验证码
      '/api/auth/new-password', // 忘记密码
    ];

    const isReadOnlyRequest =
      context.method === 'GET' &&
      (context.path.startsWith('/api/posts') || // 查看帖子列表和详情
        context.path.startsWith('/api/categories') || // 查看分类
        context.path.startsWith('/api/comments')); // 查看评论

    const isInPublicPaths = publicPaths.some(path => {
      // if (path.includes(':')) {
      //   // 处理动态路径，如 /api/posts/:id
      //   const regex = new RegExp('^' + path.replace(/:id/g, '[^/]+') + '$')
      //   return regex.test(context.path)
      // }
      return path === context.path;
    });

    return isInPublicPaths || isReadOnlyRequest;
  }
}
