interface Property {
  id: number;
  position: number;
  ownerId: number | null;
  level: number;
}

export class MapState {
  constructor(
    public gameId: string,
    public playersPositions: Map<number, number>,
    public properties: Map<number, Property>,
    public round: number,
    public stepQueue: number[],
  ) {
  }

  public incrementRound(): void {
    this.round++;
  }

  public getPlayerPosition(playerId: number): number {
    const playerPosition = this.playersPositions.get(playerId);

    if (playerPosition === undefined) {
      throw new Error(`Player with id ${playerId} not found`);
    }

    return playerPosition;
  }

  public setPlayerPosition(playerId: number, position: number): void {
    this.playersPositions.set(playerId, position);
  }

  public getProperty(id: number): Property {
    const property = this.properties.get(id);

    this.validatePropertyId(id);

    if (!property) {
      throw new Error(`Property with id ${id} not found`);
    }

    return property;
  }

  public setProperty(id: number, property: Property): void {
    this.validatePropertyId(id);
    this.properties.set(id, property);
  }

  private validatePropertyId(id: number): void {
    if (id < 0 || id >= 40) {
      throw new Error(`Id "${id}" is out of range`);
    }
  }



}
