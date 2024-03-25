FROM node:20.11-alpine3.19 as predev
WORKDIR /usr/app
COPY package*.json .
RUN npm i

FROM node:20.11-alpine3.19 as dev
WORKDIR /usr/app
COPY --from=predev /usr/app/package*.json .
RUN npm ci
COPY . .

FROM node:20.11-alpine3.19 as build
WORKDIR /usr/app
COPY --from=dev /usr/app/package*.json .
COPY --from=dev /usr/app/node_modules ./node_modules
COPY . .

CMD npm run typeorm -- migration:run && npm run start:dev
