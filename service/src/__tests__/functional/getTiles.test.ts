import request from 'superwstest';
import { Server } from 'node:http';

import { mapTiles } from '../../tiles/tiles';
import { HttpServerModule } from '../../http/HttpServerModule';
import { WebSocketServerModule } from '../../wss/WebSocketServerModule';
import { runTestApp } from './runTestApp';
import { getTestConfigModule } from './getTestConfigModule';
import { getTestConfig } from '../../nodejs/getTestConfig';


describe('game:getTiles', () => {
    let listeningServer: Server;

    beforeEach(async () => {
        const app = await runTestApp([HttpServerModule, WebSocketServerModule, getTestConfigModule(getTestConfig())]);
        listeningServer = app.get<Server>(Server);
    });

    afterEach(() => {
        listeningServer.close();
    });

    it('should return a list of tiles', async () => {
        const type = 'game:getTiles';
        await request(listeningServer)
            .ws('/ws')
            .sendJson({ type })
            .expectJson((response) => {
                expect(response.data).toEqual(mapTiles);
                expect(response.data.length).toBe(41);
                expect(response.type).toBe(type);
            })
            .close()
            .expectClosed();
    });
});
