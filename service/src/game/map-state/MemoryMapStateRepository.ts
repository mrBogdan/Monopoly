import { MapState } from './MapState';
import { MAP_STATE_REPOSITORY, MapStateRepository } from './MapStateRepository';

export class MemoryMapStateRepository implements MapStateRepository {
  private map: Map<string, MapState> = new Map();

  async getMapState(id: string): Promise<MapState> {
    const map = this.map.get(id);

    if (!map) {
      throw new Error(`MapState with id ${id} not found`);
    }

    return map;
  }

  async setMapState(mapState: MapState): Promise<void> {
    this.map.set(mapState.gameId, mapState);
  }
}

export const MEMORY_MAP_STATE_REPOSITORY = {
  param: MAP_STATE_REPOSITORY,
  useClass: MemoryMapStateRepository,
}
