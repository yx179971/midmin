import { Middleware } from '@midwayjs/core';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

@Middleware()
export class RateLimitMiddleware {
  resolve(options: {
    windowMs: number;
    max: number;
    keyGenerator?: (ctx: any) => string;
  }) {
    const { windowMs, max, keyGenerator } = options;

    return async (ctx: any, next: any) => {
      const key = keyGenerator ? keyGenerator(ctx) : ctx.ip;
      const now = Date.now();
      // const windowStart = now - windowMs;

      if (!store[key]) {
        store[key] = {
          count: 0,
          resetTime: now + windowMs,
        };
      }

      if (store[key].resetTime < now) {
        store[key].count = 0;
        store[key].resetTime = now + windowMs;
      }

      store[key].count++;

      const remaining = Math.max(0, max - store[key].count);
      const resetTime = Math.max(0, store[key].resetTime - now);

      ctx.set('X-RateLimit-Limit', max.toString());
      ctx.set('X-RateLimit-Remaining', remaining.toString());
      ctx.set('X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString());

      if (store[key].count > max) {
        ctx.status = 429;
        ctx.body = {
          success: false,
          message: '请求过于频繁，请稍后再试',
          retryAfter: Math.ceil(windowMs / 1000),
        };
        return;
      }

      await next();
    };
  }
}
