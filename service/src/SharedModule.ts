import { Module } from './decorators/Module';
import { Client, ClientConfig } from 'pg';
import { getConfig } from './nodejs/getConfig';
import { ConfigService } from './ConfigService';

export const CONFIG = Symbol('Config');

@Module({
  services: [{
    param: Client,
    useFactory: async (config: ConfigService): Promise<Client> => {
      const client = new Client(config.get('postgresConfig') as ClientConfig);
      client.on('error', console.error);
      await client.connect();
      return client;
    },
    inject: [ConfigService],
  }, {
    param: CONFIG,
    useValue: getConfig(),
  }],
})
export class SharedModule {
}
