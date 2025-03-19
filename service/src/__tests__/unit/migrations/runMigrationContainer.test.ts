import { runMigrationContainer } from '../../../migrations/runMigrationContainer';

describe('Run MigrationContainer', () => {
  it('Should be able to run', async () => {
    expect(runMigrationContainer).toBeInstanceOf(Function);
    expect(await runMigrationContainer()).toBeUndefined();
  });
});
