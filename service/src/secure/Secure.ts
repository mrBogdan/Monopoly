import jwt from 'jsonwebtoken';

import { CONFIG } from '../config/ConfigService';
import { ServiceConfiguration } from '../config/ServiceConfiguration';
import { Inject, Injectable } from '../di';

@Injectable()
export class Secure {
  private readonly key: string;

  constructor(@Inject(CONFIG) config: ServiceConfiguration) {
    this.key = config['jwtSecret'] as string;
  }

  verifyAndDecode(token: string, options?: object): unknown {
    return jwt.verify(token, this.key, options);
  }

  encode(payload: object | string | Buffer, options?: object): string {
    return jwt.sign(payload, this.key, options);
  }
}
