import { Email } from './decorators';

export class User {
  @Email
  email: string;

  constructor(
    private id: string,
    private name: string,
    private password: string,
    email: string,
  ) {
    this.email = email;
  }

  toDTO() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
    }
  }
}
