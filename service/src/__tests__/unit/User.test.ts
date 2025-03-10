import { User } from '../../user/User';
import { InvalidEmailError } from '../../InvalidEmailError';

describe('User', () => {
  it('should be valid email', () => {
    try {
      new User('id', 'anme', 'pas', 'invalidemail');
    } catch (e: any) {
      expect(e).toBeInstanceOf(InvalidEmailError);
    }
  })
});
