import { Constructor } from '../../di';

export interface Handler {
  controller(): Constructor<unknown>;
  action(): string;
}
