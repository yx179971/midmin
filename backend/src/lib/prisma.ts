import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@gen/prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

export const transformOrderBy = (s?: string) => {
  if (!s) return undefined;

  return s.split(/\s*,\s*/).reduce((s, t) => {
    if (t.startsWith('-')) {
      s.push({ [t.slice(1)]: 'desc' });
    } else {
      s.push({ [t]: 'asc' });
    }

    return s;
  }, []);
};
