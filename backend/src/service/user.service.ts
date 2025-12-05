import { httpError, Inject, Provide } from '@midwayjs/core';
import { prisma, transformOrderBy } from '../lib/prisma';
import {
  MeUpdateDTO,
  UserListDTO,
  UserUpdateDTO,
  UserUpdatePwdDTO,
} from '../dto/user.dto';
import { UserSelector, UserStatus } from '../interface';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Context } from '@midwayjs/koa';
import { RegisterDTO } from '../dto/auth.dto';

@Provide()
export class UserService {
  @Inject()
  ctx: Context;

  async list(dto: UserListDTO) {
    const { keyword, orderBy, page, pageSize } = dto;
    const where = {
      ...(keyword
        ? {
            OR: [
              { name: { contains: keyword } },
              { email: { contains: keyword } },
              { mobile: { contains: keyword } },
            ],
          }
        : {}),
    };
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: where,
        select: UserSelector.list,
        ...(page > 0 ? { skip: (page - 1) * pageSize } : {}),
        ...(pageSize > 0 ? { take: pageSize } : {}),
        orderBy: transformOrderBy(orderBy),
      }),
      prisma.user.count({ where }),
    ]);
    return {
      list: users,
      total,
    };
  }

  async view(id: string) {
    return prisma.user.findFirst({
      where: { id },
      select: UserSelector.view,
    });
  }

  async create(dto: RegisterDTO) {
    const existsUser = await prisma.user.findMany({
      where: {
        OR: [
          ...(dto.username ? [{ username: dto.username }] : []),
          ...(dto.email ? [{ email: dto.email }] : []),
          ...(dto.mobile ? [{ mobile: dto.mobile }] : []),
        ],
      },
      select: {
        username: true,
        email: true,
        mobile: true,
      },
    });
    if (existsUser.length) {
      if (dto.username && existsUser.find(u => u.username === dto.username)) {
        throw new httpError.BadRequestError('用户名已存在');
      }
      if (dto.email && existsUser.find(u => u.email === dto.email)) {
        throw new httpError.BadRequestError('邮箱已存在');
      }
      if (dto.mobile && existsUser.find(u => u.mobile === dto.mobile)) {
        throw new httpError.BadRequestError('手机号已存在');
      }
    }
    const { password, ...data } = dto;
    return prisma.user.create({
      data: {
        ...data,
        password: await bcrypt.hash(password, 8),
      },
      select: UserSelector.view,
    });
  }

  async update(id: string, dto: UserUpdateDTO | MeUpdateDTO) {
    const { ...data } = dto;
    return prisma.user.update({
      where: { id },
      data,
      select: UserSelector.view,
    });
  }

  async updatePassword(dto: UserUpdatePwdDTO) {
    const userId = this.ctx.state.user.id;
    const { password, newPassword } = dto;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new httpError.BadRequestError('密码不正确');
    }
    return prisma.user.update({
      where: { id: userId },
      data: { password: await bcrypt.hash(newPassword, 8) },
      select: UserSelector.view,
    });
  }

  async resetPassword(id: string) {
    const newPassword = randomBytes(6).toString('base64url');
    await prisma.user.update({
      where: { id },
      data: {
        failCount: 0,
        lockUntil: null,
        password: await bcrypt.hash(newPassword, 8),
        status: UserStatus.mustChangePwd,
      },
    });
    return newPassword;
  }
}
