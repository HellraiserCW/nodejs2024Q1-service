# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js LTS 20 version](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

## Downloading

```
git clone https://github.com/HellraiserCW/nodejs2024Q1-service.git
```
```
cd nodejs2024Q1-service
```
```
git checkout -b docker-prisma-postgres origin/docker-prisma-postgres
```

## Installing NPM modules

```
npm install
```

## Running application

- Rename existing `.env.example` with preset default values to `.env`

Run application locally:
```
npm run start
```
Run application locally in dev mode:
```
npm run start:dev
```
To run application in docker and watch your working directory, you should start app after launching Docker Desktop by:
```
npm run docker:dev
```

## Separate actions

### Check for existing local docker images
```
docker image ls
```

### Stop running docker
```
docker compose stop
```
### Stop running docker and remove containers
```
docker compose down
```

### Vulnerability
You can scan existing images for vulnerabilities
```
npm run docker:scan
```

### Testing

To run all tests after application is running open new terminal and enter:

```
npm run test
```
