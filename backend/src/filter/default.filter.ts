import { Catch, MidwayHttpError, HttpStatus } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch()
export class DefaultErrorFilter {
  async catch(err: Error, ctx: Context) {
    ctx.logger.error(err.stack);
    if (err instanceof MidwayHttpError) {
      ctx.status = err.status;
      return {
        success: false,
        message: err.message,
      };
    } else {
      ctx.status = HttpStatus.INTERNAL_SERVER_ERROR;
      return {
        success: false,
        message:
          process.env.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : err.message,
      };
    }
  }
}
