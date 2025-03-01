export class UnknownAccountError extends Error {
  constructor(accountId: string) {
    super(`Unknown account id ${accountId}`);
  }
}
