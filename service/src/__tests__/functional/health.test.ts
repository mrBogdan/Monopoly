import request from 'supertest';
import { Server } from 'http';
import wsRequest from 'superwstest';

import { getHttpServer } from '../../http';

describe('Health', () => {
    let listeningServer: Server;

    beforeEach(async () => {
        const server = getHttpServer();
        listeningServer = server.listen(0);
    });

    afterEach(() => {
        listeningServer.close();
    });

    it('should return 200', async () => {
        const response = await request(listeningServer).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'OK' });
    });

    it('should return 404 on path not found', async () => {
        const response = await request(listeningServer).get('/incorrect-path');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Not found' });
    });

    it('should ping pong on ws', async () => {
        await wsRequest(listeningServer)
            .ws('/ws')
            .sendJson({ type: 'ping' })
            .expectJson({ type: 'ping', message: 'pong'  })
            .close()
            .expectClosed();
    });
});
