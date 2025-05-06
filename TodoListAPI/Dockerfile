FROM node:22.11-alpine

WORKDIR /api

COPY package.json ./

RUN yarn global add @nestjs/cli prisma && yarn 

COPY . .

RUN yarn global add prisma 

EXPOSE 3000


CMD ["yarn", "start:dev" ]