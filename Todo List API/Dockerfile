FROM node:22.11-alpine

WORKDIR /api

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev" ]