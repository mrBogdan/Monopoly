import { Module } from '../../../decorators/Module';

describe('Module', () => {
  it('should throw an error if module does not have any services or controllers', () => {
    expect(() => {
      @Module({
      })
      class TestModule{}
    }).toThrow('Module should have at least one service or controller');
  });
});
