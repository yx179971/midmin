FROM node:24-alpine

RUN npm install -g cnpm --registry=https://registry.npmmirror.com && cnpm install pm2 -g
