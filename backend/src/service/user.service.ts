import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { prisma } from '../lib/prisma';

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return prisma.user.findFirst();
  }
}
