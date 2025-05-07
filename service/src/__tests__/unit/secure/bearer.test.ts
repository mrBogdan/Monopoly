import { bearer, getBearer } from '../../../secure';

describe('Bearer', () => {
  it('should return bearer token', () => {
    const token = 'abc';
    expect(bearer(token)).toEqual('Bearer abc');
  });

  it('should return bearer token from authorization header', () => {
    const authorizationHeader = 'Bearer abc';
    expect(getBearer(authorizationHeader)).toEqual('abc');
  })
})
