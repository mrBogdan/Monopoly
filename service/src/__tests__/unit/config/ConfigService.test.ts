import { ConfigService } from '../../../config/ConfigService';
import { ServiceConfiguration } from '../../../config/ServiceConfiguration';

describe('ConfigService', () => {
  it('should return default value', async () => {
    const config = {};
    const configService = new ConfigService(config as ServiceConfiguration);

    const result = configService.get('key:defaultValue');
    expect(result).toEqual('defaultValue');
  });

  it('should return value from config', async () => {
    const config = {
      key: 'value',
    };
    const configService = new ConfigService(config as unknown as ServiceConfiguration);

    const result = configService.get('key');
    expect(result).toEqual('value');
  });

  it('should return nested value from config', async () => {
    const config = {
      nested: {
        key: 'nestedValue',
      },
    };
    const configService = new ConfigService(config as unknown as ServiceConfiguration);

    const result = configService.get('nested.key');
    expect(result).toEqual('nestedValue');
  });

  it('should return default value for nested key', async () => {
    const config = {
      nested: {
        key: undefined,
      },
    };
    const configService = new ConfigService(config as unknown as ServiceConfiguration);

    const result = configService.get('nested.key:defaultValue');
    expect(result).toEqual('defaultValue');
  });
});
