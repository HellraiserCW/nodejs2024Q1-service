FROM node:20.11-alpine3.19 as build
WORKDIR /user/app
COPY package*.json .
RUN npm install
COPY . .

FROM node:20.11-alpine3.19
WORKDIR /user/app
COPY --from=build /user/app /user/app
EXPOSE 4000
CMD ["npm", "run", "start:dev"]