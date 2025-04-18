import { ServiceConfiguration } from '../../../config/ServiceConfiguration';
import { Secure } from '../../../secure';

describe('Secure test', () => {
  const secure = new Secure({ jwtSecret: '123' } as ServiceConfiguration);

  it('should verify and decode a token', () => {
    const payload = { id: 1, name: 'test' };
    const token = secure.encode(payload, { noTimestamp: true });
    const decoded = secure.verifyAndDecode(token, { complete: false });
    expect(decoded).toEqual(payload);
  })
});
