export class Room {
    constructor(
        public id: string,
        public users: Map<string, Record<string, unknown>>,
    ) {}

    public addUser(userId: string, user: Record<string, unknown>): void {
      if (this.users.has(userId)) {
        return;
      }

      this.users.set(userId, user);
    }

    public getUserIds(): string[] {
      return Array.from(this.users.keys());
    }
}
