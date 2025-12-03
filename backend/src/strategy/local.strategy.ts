import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy, IStrategyOptionsWithRequest } from 'passport-local';
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
      throw new httpError.UnauthorizedError('用户不存在 ' + username);
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new httpError.UnauthorizedError('密码错误 ' + username);
    }

    delete user.password;
    return user;
  }

  getStrategyOptions(): IStrategyOptionsWithRequest {
    return {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    };
  }
}
