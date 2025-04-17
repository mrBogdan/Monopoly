import { Client, ClientConfig } from 'pg';

import { ConfigService } from '../config/ConfigService';

export const Database = {
  param: Client,
  useFactory: async (config: ConfigService): Promise<Client> => {
    const client = new Client(config.get('postgresConfig') as ClientConfig);
    client.on('error', console.error);
    await client.connect();
    return client;
  },
  inject: [ConfigService],
}
