import jwt from 'jsonwebtoken';

import { Injectable, Value } from '../di';

@Injectable()
export class Secure {
  constructor(@Value('jwtSecret') private key: string) {
  }

  verifyAndDecode(token: string, options?: object): unknown {
    return jwt.verify(token, this.key, options);
  }

  encode(payload: object | string | Buffer, options?: object): string {
    return jwt.sign(payload, this.key, options);
  }
}
