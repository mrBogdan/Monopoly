import { Server } from 'node:http';

import request from 'supertest';

import { AppModule } from '../../../AppModule';
import { Controller, Module } from '../../../decorators';
import {Get, Param, QueryParam } from '../../../http';
import { runTestApp, TestApp } from '../runTestApp';

@Controller('/user')
class UserController {

  @Get('query-param')
  getQueryParam(@QueryParam('query') query: string) {
    return query;
  }

  @Get('query-param-number')
  getQueryParamNumber(@QueryParam('query') query: number) {
    return query;
  }

  @Get('query-param-and-path-param/@id')
  getQueryParamAndPathParam(@QueryParam('query') query: string, @Param('id') id: string) {
    return {query, id};
  }
}

@Module({
  controllers: [UserController],
})
class TestModule {
}

describe('Query param', () => {
  let listeningServer: Server;
  let app: TestApp;

  beforeAll(async () => {
    app = await runTestApp([TestModule, ...AppModule]);
    listeningServer = app.get<Server>(Server);
  });

  afterAll(async () => {
    await app.gracefulShutdown();
  });


  it('should return query param', async () => {
    const response = await request(listeningServer).get('/user/query-param?query=hello');
    expect(response.status).toBe(200);
    expect(response.body).toEqual('hello');
  });

  it('should be possible to use query param and path param together', async () => {
    const response = await request(listeningServer).get('/user/query-param-and-path-param/some-id?query=hello');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({query: 'hello', id: 'some-id'});
  });

  it('should throw BadRequestError if query param is not passed', async () => {
    const response = await request(listeningServer).get('/user/query-param');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({message: 'Bad Request', reason: 'Missing query parameter: query', status: 400});
  });

  it('should cast query param to number', async () => {
    const response = await request(listeningServer).get('/user/query-param-number?query=123');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(123);
    expect(typeof response.body).toBe('number');
  });
});
