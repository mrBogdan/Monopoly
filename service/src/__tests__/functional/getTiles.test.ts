import { Server } from 'node:http';

import request from 'superwstest';


import { HttpServerModule } from '../../http/HttpServerModule';
import { getTestConfig } from '../../nodejs/getTestConfig';
import { mapTiles } from '../../tiles/tiles';
import { WebSocketServerModule } from '../../wss/WebSocketServerModule';

import { getTestConfigModule } from './getTestConfigModule';
import { runTestApp } from './runTestApp';



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
