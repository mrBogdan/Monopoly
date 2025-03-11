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
npm run test:unit
```
