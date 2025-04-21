export class Room {
    constructor(
        public id: string,
        public users: Map<string, Record<string, unknown>>,
    ) {}

    public async addUser(userId: string, user: Record<string, unknown>): Promise<void> {
      if (this.users.has(userId)) {
        return;
      }

      this.users.set(userId, user);
    }
}
