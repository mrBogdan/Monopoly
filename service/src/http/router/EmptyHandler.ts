import { Handler } from './Handler';

export class EmptyHandler implements Handler {
  controller = '';
  action = '';

  isEmpty() {
    return true;
  }

  static of() {
    return new EmptyHandler();
  }
}
