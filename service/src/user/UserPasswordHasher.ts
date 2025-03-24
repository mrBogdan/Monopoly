import {hash} from "node:crypto";

export class UserPasswordHasher
{
    algorithm: string = 'sha1';

    public hash(password: string): string {
        return hash(this.algorithm, password);
    }
}