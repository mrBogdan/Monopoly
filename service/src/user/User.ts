import { Email } from '../decorators';

export class User {
  @Email
  email: string;

  constructor(
    public id: string,
    public name: string,
    public passwordHash: string,
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
