export class GameNotFoundError extends Error {
  constructor(gameId: string) {
    super(`Game "${gameId}" not found`);
  }
}
