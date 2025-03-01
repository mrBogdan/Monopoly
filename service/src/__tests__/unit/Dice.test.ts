import { Dice } from '../../Dice';
import { RandMachine } from '../../RandMachine';

describe('Dice', () => {
  const randMachine = new RandMachine();
  const dice = new Dice(randMachine);

  const randFewValues = (count: number): number[] => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(dice.roll());
    }

    return result;
  }

  const result = randFewValues(100);

  it('should rand value in range from 1 to 6 including', () => {
    expect(result.every(number => number >= 1 && number <= 6)).toBe(true);
  });

  it('should rand 1', () => {
    expect(result.some(number => number === 1)).toBe(true);
  });

  it('should rand 6', () => {
    expect(result.some(number => number === 6)).toBe(true);
  });
});
