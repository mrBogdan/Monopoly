import request from 'supertest';
import { Server } from 'node:http';
import wsRequest from 'superwstest';

import { getHttpServer } from '../../http/getHttpServer';
import { AppModule } from '../../AppModule';

describe('Health', () => {
    let listeningServer: Server;

    beforeEach(async () => {
        const server = getHttpServer(AppModule);
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
        expect(response.body).toEqual({ message: 'Not Found', status: 404, reason: 'Route "/incorrect-path" with method GET not found' });
    });

    it('should ping pong on ws', async () => {
        await wsRequest(listeningServer)
            .ws('/ws')
            .sendJson({ type: 'ping' })
            .expectJson({ type: 'ping', message: 'pong'  })
            .close()
            .expectClosed();
    });

    it('should return 404 on ws type not found', async () => {
        const type = 'incorrect-type';
        await wsRequest(listeningServer)
            .ws('/ws')
            .sendJson({ type })
            .expectJson({ message: 'Not Found', status: 404, reason: `Action "${type}" not found` })
            .close()
            .expectClosed();
    });
});
