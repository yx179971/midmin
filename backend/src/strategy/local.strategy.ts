import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, IStrategyOptions } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma';
import { httpError } from '@midwayjs/core';

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  async validate(username, password) {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        group: true,
      },
    });
    if (!user) {
      throw new httpError.UnauthorizedError('用户名或密码错误');
    }
    const now = new Date();
    const lockMinutes = 30;
    if (user.lockUntil && user.lockUntil > now) {
      const diff = Math.ceil(
        (user.lockUntil.getTime() - now.getTime()) / 60000
      );
      if (diff <= lockMinutes) {
        throw new httpError.UnauthorizedError('用户已被锁定，请稍候再试');
      } else {
        throw new httpError.UnauthorizedError('用户已被锁定，请联系管理员');
      }
    }
    if (!(await bcrypt.compare(password, user.password))) {
      const failCount = user.failCount + 1;
      const data = { lockUntil: null, failCount };
      let msg = '用户名或密码错误，还可以尝试' + (5 - failCount) + '次';
      if (failCount >= 5) {
        data.lockUntil = new Date(now.getTime() + lockMinutes * 60000);
        data.failCount = 0;
        msg = '用户已被锁定，请稍候再试';
      }
      await prisma.user.update({
        where: { id: user.id },
        data,
      });
      throw new httpError.UnauthorizedError(msg);
    }

    delete user.password;
    await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLoginAt: new Date(),
        lockUntil: null,
        failCount: 0,
      },
    });
    return user;
  }

  getStrategyOptions(): IStrategyOptions {
    return {
      usernameField: 'username',
      passwordField: 'password',
      // passReqToCallback: true,
      session: false,
    };
  }
}
