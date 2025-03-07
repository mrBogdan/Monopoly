import { Tile } from '../Tile';
import { MapTile } from '../MapTile';
import { boss } from './Perfumeries/boss';
import { audi } from './Cars/audi';
import { tax } from './Game/tax';
import { chance } from './Game/chance';
import { chanel } from './Perfumeries/chanel';
import { start } from './Game/start';
import { adidas } from './Clothing/adidas';
import { puma } from './Clothing/puma';
import { lacoste } from './Clothing/lacoste';
import { jail } from './Game/jail';
import { amazon } from './WebServices/amazon';
import { rockstar } from './VideoGames/rockstar';
import { viber } from './WebServices/viber';
import { facebook } from './WebServices/facebook';

const createMapTile = (tile: Tile, index: number): MapTile => {
  return {
    tile,
    index,
  }
}

const tiles: Tile[] = [
  start,
  chanel,
  chance,
  boss,
  tax,
  audi,
  adidas,
  chance,
  puma,
  lacoste,
  jail,
  amazon,
  rockstar,
  viber,
  facebook,
];
const mapTiles: MapTile[] = [];

for (let i = 0; i < 40; i ++) {
  mapTiles.push(createMapTile(tiles[i], i + 1));
}

export {
  mapTiles,
}
