import request from 'superwstest';
import { Server } from 'node:http';

import { getHttpServer } from '../../http/getHttpServer';
import { mapTiles } from '../../tiles/tiles';


describe('game:getTiles', () => {
    let listeningServer: Server;

    beforeEach(async () => {
        const server = getHttpServer();
        listeningServer = server.listen(0);
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
