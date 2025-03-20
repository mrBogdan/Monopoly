import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { Client } from 'pg';

import agendaJson from './migration-agenda.json';

type Migration = {
  up: string,
  rollback: string,
  description: string,
  issueCode: string
};

type MigrationAgenda = {
  migrations: Migration[]
}

const isFileExists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
};

const toSqlExt = (fileName: string): string => (`${fileName}.sql`);

const readMigrationFile = async (migrationName: string): Promise<string> => {
  const filePath = path.join(process.cwd(), 'src', 'migrations', toSqlExt(migrationName));

  if (!await isFileExists(filePath)) {
    return '';
  }

  return readFile(filePath, 'utf8');
};

const executeMigration = async (connectedClient: Client, migrationFiles: string[]) => {
  const migrations = await Promise.all(migrationFiles.map(readMigrationFile));

  return Promise.all(migrations.map(migrationCode => {
    return connectedClient.query(migrationCode);
  }));
};

export const migrate = async (connectedClient: Client) => {
  console.log('Migration started...');
  const agenda: MigrationAgenda = agendaJson;

  const migrationFiles: string[] = agenda.migrations
    .map(migration => migration.up);

  await executeMigration(connectedClient, migrationFiles);

  console.log('Migration done', migrationFiles);
};

export const rollback = async (connectedClient: Client) => {
  const agenda: MigrationAgenda = agendaJson;

  const migrationFiles: string[] = agenda.migrations
    .map(migration => migration.rollback);

  await executeMigration(connectedClient, migrationFiles);

  console.log('Rollback migration done', migrationFiles);
};
