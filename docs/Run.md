## Prerequisites
* Docker
* nvm (node-version-manager)
* node 20 +

## To run whole app

```shell
docker-compose up
```

## To run backend

### docker

```shell
cd ./service
npm run start:docker
```

## To run backend tests

```shell
cd ./service
npm run test:int
```

```shell
cd ./service
npm run test:unit
```

## Docker Build service (backend)

```shell
cd ./service
npm run build:docker
```

## Run migration

```shell
cd ./service
npm run start:doker:migration
```

## Run nodejs debuger for specific file

> Useful line: https://nodejs.org/en/learn/getting-started/debugging

```shell
cd ./service

