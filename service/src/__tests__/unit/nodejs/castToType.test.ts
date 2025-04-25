import { castToType } from '../../../nodejs';

describe('castToType', () => {
  it('should cast string to number', () => {
    expect(castToType('123', 'Number')).toBe(123);
  });

  it('should cast string to boolean', () => {
    expect(castToType('true', 'Boolean')).toBe(true);
    expect(castToType('false', 'Boolean')).toBe(false);
  });

  it('should cast string to date', () => {
    const date = new Date('2023-01-01');
    expect(castToType(date, 'date')).toEqual(date);
  });
})
