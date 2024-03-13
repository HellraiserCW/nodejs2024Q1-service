# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js LTS 20 version](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)

## Downloading

```
git clone git@github.com:HellraiserCW/nodejs2024Q1-service.git
```
```
cd nodejs2024Q1-service
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
Run application in docker:
```
npm run docker
```

To run application in docker and watch your working directory, you should start app by:
```
npm run docker:dev
```

## Separate actions

### Stop running docker and remove containers
```
docker compose down
```

### Migrations
Migrations runs automatically on docker start. Scripts for manual migrations process:
```
npm run migration:create
npm run migration:generate
npm run migration:run
npm run migration:revert
```

### Vulnerability
You can scan images for vulnerabilities after docker is running
```
npm run docker:scan
```

### Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```
