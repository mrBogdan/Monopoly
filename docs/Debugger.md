## Debug
## Prerequisites
* VSCode
* PHPStorm

## VSCode

1. Create file inside .vscode folder with name launch.json:
```json
{
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "attach",
        "name": "Attach to Docker: ts-node-dev",
        "port": 9229,
        "address": "localhost",
        "restart": true,
        "localRoot": "${workspaceFolder}/service/",
        "remoteRoot": "/app",
        "protocol": "inspector",
        "skipFiles": ["<node_internals>/**"]
      }
    ]
  }
```

2. Make sure that docker container exposes port 9229 and execute command:


    ports:
      - "8080:8080"
      - "9229:9229"

    command: >
      npx ts-node-dev --respawn --pretty --inspect=0.0.0.0:9229 src/index.ts
3. ctrl + shift + d
4. select "Attach to Docker: ts-node-dev"
5. enjoy debugging

## PHPSTORM

1. Run => Edit Configurations => + => Node.js/Chrome =>
```
Attach to Docker: ts-node-dev
Name: typescript
Host: localhost
Port: 9229
Remote url mappings..: /service => /app
```

2. Make sure that docker container exposes port 9229 and execute command:


    ports:
      - "8080:8080"
      - "9229:9229"

    command: >
      npx ts-node-dev --respawn --pretty --inspect=0.0.0.0:9229 src/index.ts

3. start debug typescript and enjoy debugging