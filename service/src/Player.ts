export class Player {
  private round: number = 0

  constructor(private id: string, private userId: string) {
  }

  static of(id: string, userId: string): Player {
    return new Player(id, userId);
  }

  increaseRound(): number {
    this.round ++;
    return this.round;
  }

  getRound(): number {
    return this.round;
  }

  getId(): string {
    return this.id;
  }

  toDTO() {}

  toEntity() {}
}
