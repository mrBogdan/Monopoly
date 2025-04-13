import { Response } from '../../../http/Response';

describe('Response', () => {
  it('should build a response with body, headers, and status code', () => {
    const body = {message: 'Hello, World!'};
    const headers = {'Content-Type': 'application/json', 'X-Custom-Header': 'CustomValue'};
    const statusCode = 200;

    const response = Response.builder()
      .setBody(body)
      .setHeader('Content-Type', 'application/json')
      .setHeader('X-Custom-Header', 'CustomValue')
      .build();

    expect(response.body).toEqual(body);
    expect(response.headers).toEqual(headers);
    expect(response.statusCode).toEqual(statusCode);
  });

  it('should build a response with only body', () => {
    const body = {message: 'Hello, World!'};

    const response = Response.builder()
      .setBody(body)
      .build();

    expect(response.body).toEqual(body);
    expect(response.headers).toEqual(undefined);
    expect(response.statusCode).toEqual(200);
  });

  it('should build a response with only headers', () => {
    const headers = {'Content-Type': 'application/json', 'X-Custom-Header': 'CustomValue'};

    const response = Response.builder()
      .setHeader('Content-Type', 'application/json')
      .setHeader('X-Custom-Header', 'CustomValue')
      .build();

    expect(response.body).toEqual(undefined);
    expect(response.headers).toEqual(headers);
    expect(response.statusCode).toEqual(200);
  });

  it('should build a response with status code', () => {
    const statusCode = 404;

    const response = Response.builder()
      .setStatusCode(statusCode)
      .build();

    expect(response.body).toEqual(undefined);
    expect(response.headers).toEqual(undefined);
    expect(response.statusCode).toEqual(statusCode);
  });

  it('should set cookies correctly', () => {
    const response = Response.builder()
      .setCookie('session_id', 'abc123')
      .build();

    expect(response.headers).toEqual({
      'Set-Cookie': 'session_id=abc123',
    });
  });

  it('should set cookies with options correctly', () => {
    const response = Response.builder()
      .setCookie('session_id', 'abc123', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        maxAge: 3600,
      })
      .build();

    expect(response.headers).toEqual({
      'Set-Cookie': 'session_id=abc123; HttpOnly; Secure; SameSite=Strict; Max-Age=3600',
    });
  });

  it('should handle multiple cookies correctly', () => {
    const response = Response.builder()
      .setHeader('Content-Type', 'application/json')
      .setCookie('session_id', 'abc123')
      .setCookie('user_id', 'xyz789')
      .setStatusCode(201)
      .setBody({message: 'Created'})
      .build();

    expect(response.headers).toEqual({
      'Set-Cookie': 'session_id=abc123, user_id=xyz789',
      'Content-Type': 'application/json',
    });
  });

  it('should set correct date format for cookies Expires parameter', () => {
    const date = new Date('2023-10-01T00:00:00Z');
    const response = Response.builder()
      .setCookie('session_id', 'abc123', {
        expires: date,
      })
      .build();

    expect(response.headers).toEqual({
      'Set-Cookie': `session_id=abc123; Expires=${date.toUTCString()}`,
    });
  });
});
