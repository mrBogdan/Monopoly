import { User } from '../user/User';

export class Player {
  public userId: string;
  public name: string;
  public id: number;

  constructor(userId: string, name: string, id: number) {
    this.userId = userId;
    this.name = name;
    this.id = id;
  }

  public static of(user: User, index: number): Player {
    return new Player(user.id, user.name, index);
  }
}
