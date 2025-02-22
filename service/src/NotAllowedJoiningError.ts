export class NotAllowedJoiningError extends Error {
  constructor(userId: string) {
    super(`User "${userId}" is not allowed to join`);
  }
}
