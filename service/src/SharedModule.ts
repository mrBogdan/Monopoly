import { Module } from './decorators';
import { Database } from './database/Database';
import { Clock } from './clock';
import { Secure } from './secure';

@Module({
  services: [Database, Clock, Secure],
})
export class SharedModule {
}
