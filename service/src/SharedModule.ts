import { Clock } from './clock';
import { Database } from './database/Database';
import { Module } from './decorators';
import { IdGenerator } from './idGenerator/IdGenerator';
import { RandMachine } from './rand/RandMachine';
import { Secure } from './secure';

@Module({
  services: [Database, Clock, Secure, RandMachine, IdGenerator],
})
export class SharedModule {
}
