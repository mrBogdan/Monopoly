import { JsonWebTokenError } from 'jsonwebtoken';

import { Secure } from '../../../secure';

describe('Secure test', () => {
  const secure = new Secure('123');

  it('should verify and decode a token', () => {
    const payload = { id: 1, name: 'test' };
    const token = secure.encode(payload, { noTimestamp: true });
    const decoded = secure.verifyAndDecode(token, { complete: false });
    expect(decoded).toEqual(payload);
  });

  it('should throw an error for an invalid token', () => {
    const payload = { id: 1, name: 'test' };
    const token = secure.encode(payload, { noTimestamp: true });

    const invalidToken = token.replace('e', 'k');
    expect(() => secure.verifyAndDecode(invalidToken, { complete: false })).toThrow(JsonWebTokenError);
  });
});
