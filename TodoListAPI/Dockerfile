# FROM node:22.11-alpine

# WORKDIR /api

# COPY package.json ./

# RUN yarn global add @nestjs/cli prisma 

# COPY . .

# RUN yarn global add prisma 

# EXPOSE 3000


# CMD ["yarn", "start:dev" ]

FROM node:22.11-alpine

WORKDIR /api

# Copier package.json et yarn.lock pour installer les dépendances
COPY package.json yarn.lock ./

# Installer les dépendances locales
RUN yarn install

# Copier tout le reste des fichiers de ton projet
COPY . .

# Installer les outils de développement si nécessaire (optionnel)
RUN yarn global add @nestjs/cli prisma

EXPOSE 3000

CMD ["yarn", "start:dev"]