import {randomUUID, UUID} from "crypto";

export class UserIdGenerator
{
    public generateUUID(): UUID {
        return randomUUID();
    }
}