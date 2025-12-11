#!/bin/sh
set -e
npx prisma migrate dev
#npx prisma db seed
#npm run start
pm2-runtime start ecosystem.config.js
