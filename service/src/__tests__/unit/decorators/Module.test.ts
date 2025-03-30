import { Module } from '../../../decorators/Module';

describe('Module', () => {
  it('should throw an error if module does not have any services or controllers', () => {
    expect(() => {
      @Module({
      })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      class TestModule{}
    }).toThrow('Module should have at least one service or controller');
  });
});
