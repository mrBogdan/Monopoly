export class NotEnoughBalanceError extends Error {
  constructor(accountId: string, balance: number) {
    super(`Account "${accountId}" does not have enough balance: ${balance}`);
  }
}
