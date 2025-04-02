import { Client, ConnectionConfig } from 'pg';

export const getConnectedPostgresClient = async (connectionConfig: ConnectionConfig): Promise<Client> => {
  const client = new Client(connectionConfig);

  client.on('error', console.error);

  await client.connect();

  return client;
}
