import {randomUUID, UUID} from 'node:crypto';

export class IdGenerator
{
    public generateUUID(): UUID {
        return randomUUID();
    }
}
