export class Player {
  constructor(private id: string, private name: string) {
  }

  getName(): string {
    return this.name;
  }

  getId(): string {
    return this.id;
  }
}
