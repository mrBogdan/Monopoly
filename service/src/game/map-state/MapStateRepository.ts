import { MapState } from './MapState';

export const MAP_STATE_REPOSITORY = Symbol('MapStateRepository');

export interface MapStateRepository {
  getMapState(id: string): Promise<MapState>;
  setMapState(mapState: MapState): void;
}
