import { Prisma } from '../generated/prisma/client';

export * from './user';

declare module '@midwayjs/koa/dist/interface' {
  interface State {
    user?: Prisma.Prisma__UserClient<any> | null;
  }
}
