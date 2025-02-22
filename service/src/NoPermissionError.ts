export class NoPermissionError extends Error {
  constructor(userId: string) {
    super(`User - "${userId}" is not allowed to access`);
  }
}
