interface Property {
  id: number;
  position: number;
  ownerId: number | null;
  level: number;
}

export class MapState {
  gameId: string;
  playersPositions: Map<number, number>;
  properties: Map<number, Property>;
}
