import { Player } from '../Player';
import { BankAccount } from './BankAccount';
import { UnknownAccountError } from '../UnknownAccountError';
import { Credit } from '../Credit';

export class Bank {
  private readonly accounts: Map<string, BankAccount> = new Map();
  private readonly bankPlayer: Player = Player.of('bank', 'Bank');

  constructor(players: Player[], initialBackBalance = 100000) {
    const bankAccount = BankAccount.of(this.bankPlayer, initialBackBalance);
    const accounts = [bankAccount, ...players.map(BankAccount.of)];

    accounts.forEach(account => {
      this.accounts.set(account.getId(), account);
    });

  }

  getAccount(id: string): BankAccount | undefined {
    return this.accounts.get(id);
  }

  addAccount(account: BankAccount) {
    this.accounts.set(account.getId(), account);
  }

  takeCredit(account: BankAccount) {
  }

  transfer(from: string, to: string, amount: number) {
    const fromAccount = this.getAccount(from);
    const toAccount = this.getAccount(to);

    if (!fromAccount) {
      throw new UnknownAccountError(from);
    }

    if (!toAccount) {
      throw new UnknownAccountError(to);
    }

    toAccount.increaseBalance(amount);
  }

  charge(from: string, amount: number) {
    this.transfer(from);
  }
}
