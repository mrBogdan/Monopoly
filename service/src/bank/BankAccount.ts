import { NotEnoughBalanceError } from '../NotEnoughBalanceError';
import { Player } from '../Player';

export class BankAccount {
  constructor(private id: string, private player: Player, private balance: number) {
  }

  static of(player: Player, initialBalance: number = 0): BankAccount {
    return new BankAccount(player.getId(), player, initialBalance);
  }

  getId(): string {
    return this.id;
  }

  getBalance(): number {
    return this.balance;
  }

  isEnoughBalance(amount: number): boolean {
    return this.balance >= amount;
  }

  increaseBalance(amount: number) {
    this.balance += amount;
  }

  decreaseBalance(amount: number) {
    if (this.balance < amount) {
      throw new NotEnoughBalanceError(this.getId(), this.getBalance());
    }

    this.balance -= amount;
  }
}
