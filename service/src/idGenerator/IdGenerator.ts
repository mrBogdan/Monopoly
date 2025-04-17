import {randomUUID, UUID} from 'crypto';

export class IdGenerator
{
    public generateUUID(): UUID {
        return randomUUID();
    }
}