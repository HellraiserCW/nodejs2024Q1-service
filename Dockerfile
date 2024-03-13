FROM node:20.11-alpine3.19
WORKDIR /user/app
COPY package*.json .
RUN npm ci && npm cache clean --force
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]
