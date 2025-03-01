import { Player } from './Player';
import { BankAccount } from './BankAccount';
import { UnknownAccountError } from './UnknownAccountError';

export class Bank {
  private accounts: BankAccount[];

  constructor(players: Player[]) {
    this.accounts = players.map(BankAccount.of);
  }

  getAccount(id: string): BankAccount {
    return this.accounts.find(BankAccount.findById(id));
  }

  addAccount(account: BankAccount) {
    this.accounts.push(account);
  }

  takeCredit(account: BankAccount) {}

  transfer(from: string, to: string, amount: number) {
    const fromAccount = this.getAccount(from);
    const toAccount = this.getAccount(to);

    if (!fromAccount) {
      throw new UnknownAccountError(fromAccount);
    }

    if (!toAccount) {
      throw new UnknownAccountError(toAccount);
    }

    fromAccount.decreaseBalance(amount);
    toAccount.increaseBalance(amount);
  }
}
