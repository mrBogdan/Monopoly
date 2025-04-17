import {Hasher} from '../../hasher/Hasher';

describe('Hasher', () => {
  let hasher: Hasher;

  beforeEach(() => {
    hasher = new Hasher();
  });

  test('hash should return a hashed string', () => {
    const password = 'testPassword123';
    const hashed = hasher.hash(password);
    expect(hashed).toBeDefined();
    expect(hashed).not.toBe(password);
  });

  test('hash should produce consistent output for same input', () => {
    const password = 'testPassword123';
    const hash1 = hasher.hash(password);
    const hash2 = hasher.hash(password);
    expect(hash1).toBe(hash2);
  });
});