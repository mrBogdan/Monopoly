import {readFile, access} from 'node:fs/promises';
import {Client} from 'pg';
import path from 'node:path';

import agendaJson from './migration-agenda.json';
import * as fs from 'node:fs';

type MigrationAgenda = {
  migrations: Record<string,  {
    up: string,
    rollback: string,
  }>
}

const isFileExists = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

const toSqlExt = (fileName: string): string => (`${fileName}.sql`);

const readMigrationFile = async (migrationName: string): Promise<string> => {
  const filePath = path.join(process.cwd(), 'src', 'migrations', toSqlExt(migrationName));

  if (!await isFileExists(filePath)) {
    return '';
  }

  return readFile(filePath, 'utf8');
}

const executeMigration = async (connectedClient: Client, migrationFiles: string[]) => {
  const migrations = await Promise.all(migrationFiles.map(readMigrationFile));

  return Promise.all(migrations.map(migration => {
    return connectedClient.query(migration);
  }));
}

export const migrate = async (connectedClient: Client) => {
  const agenda: MigrationAgenda = agendaJson;

  const featureMigrations = Object.keys(agenda.migrations);

  const migrationFiles: string[] = featureMigrations
    .map(migration => agenda.migrations[migration].up)
    .filter(v => v);

  const result = await executeMigration(connectedClient, migrationFiles);

  console.log('Migration done', { result});
}

export const rollback = async (connectedClient: Client) => {
  const agenda: MigrationAgenda = agendaJson;

  const featureMigrations = Object.keys(agenda.migrations);

  const migrationFiles: string[] = featureMigrations
  .map(migration => agenda.migrations[migration].rollback)
  .filter(v => v);

  const result = await executeMigration(connectedClient, migrationFiles);

  console.log('Rollback migration done', { result });
}
