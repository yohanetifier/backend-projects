FROM node:23-alpine

WORKDIR /api

COPY package.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "start:dev" ]