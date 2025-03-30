import { User } from '../../user/User';
import { InvalidEmailError } from '../../decorators/InvalidEmailError';

describe('User', () => {
  it('should be valid email', () => {
    try {
      new User('id', 'anme', 'pas', 'invalidemail');
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidEmailError);
    }
  })
});
