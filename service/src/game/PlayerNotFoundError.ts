export class PlayerNotFoundError extends Error {
  constructor(userId: string) {
    super(`Player with userId: ${userId} not found`);
  }
}
