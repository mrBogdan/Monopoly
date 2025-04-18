import { Clock } from './clock';
import { Database } from './database/Database';
import { Module } from './decorators';
import { Secure } from './secure';

@Module({
  services: [Database, Clock, Secure],
})
export class SharedModule {
}
