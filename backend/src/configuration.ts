import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as crossDomain from '@midwayjs/cross-domain';
import * as busboy from '@midwayjs/busboy';
import * as staticFile from '@midwayjs/static-file';
import * as security from '@midwayjs/security';
import * as passport from '@midwayjs/passport';

import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';

import { AuthGuard } from './guard/auth.guard';
import { PermissionGuard } from './guard/permission.guard';

import { DefaultErrorFilter } from './filter/default.filter';
import { NotFoundFilter } from './filter/notfound.filter';

import 'dotenv/config';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    crossDomain,
    busboy,
    staticFile,
    security,
    passport,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    this.app.useMiddleware([ReportMiddleware]);

    this.app.useGuard([AuthGuard, PermissionGuard]);

    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
