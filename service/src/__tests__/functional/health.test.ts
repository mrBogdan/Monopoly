import request from 'supertest';
import { Server } from 'http';

import { getHttpServer } from '../../http';

describe('Health', () => {
    let server: Server;

    beforeAll(() => {
        server = getHttpServer();
    })

    it('should return 200', async () => {
        const response = await request(server).get('/health');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'OK' });
    });
});
