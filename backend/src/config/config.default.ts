import { MidwayConfig } from '@midwayjs/core';
import { DefaultUploadFileMimeType, uploadWhiteList } from '@midwayjs/busboy';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1764471845433_4300',
  koa: {
    port: 7001,
  },
  validate: {
    validationOptions: {
      stripUnknown: true,
    },
  },
  midwayLogger: {
    default: {
      transports: {
        file: false,
        error: false,
      },
    },
  },
  busboy: {
    limits: 1024 * 1024 * 10, // 10MB
    whitelist: uploadWhiteList,
    mimeTypeWhiteList: DefaultUploadFileMimeType,
  },
  staticFile: {
    dirs: {
      default: {
        alias: {
          '/': '/index.html',
        },
        // preload: true,
      },
      uploads: {
        prefix: '/uploads',
        dir: 'uploads',
        preload: false,
      },
    },
  },
} as MidwayConfig;
