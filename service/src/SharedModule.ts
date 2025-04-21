import { Clock } from './clock';
import { Database } from './database/Database';
import { Module } from './decorators';
import { RandMachine } from './rand/RandMachine';
import { Secure } from './secure';

@Module({
  services: [Database, Clock, Secure, RandMachine],
})
export class SharedModule {
}
