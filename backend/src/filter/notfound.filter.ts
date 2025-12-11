import { Catch, httpError, HttpStatus, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import * as fs from 'fs';
import { Config } from '@midwayjs/core';
import * as path from 'path';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  @Config('staticFile.dirs.default.dir')
  public staticDir: string;

  async catch(err: MidwayHttpError, ctx: Context) {
    if (ctx.path.startsWith('/api/') || ctx.path.startsWith('/upload/')) {
      ctx.status = HttpStatus.NOT_FOUND;
      // ctx.redirect('/404.html');
    } else {
      ctx.status = HttpStatus.OK;
      ctx.body = fs.readFileSync(
        path.join(this.staticDir, 'index.html'),
        'utf-8'
      );
    }
  }
}
