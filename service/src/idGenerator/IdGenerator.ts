import {randomUUID, UUID} from 'node:crypto';

import { Injectable } from '../di';

@Injectable()
export class IdGenerator
{
    public generateUUID(): UUID {
        return randomUUID();
    }
}
