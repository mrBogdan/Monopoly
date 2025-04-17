import { MapTile } from '../tile/MapTile';
import { Tile } from '../tile/Tile';

import { americanAirlines } from './Airlines/american-airlines';
import { britishAirways } from './Airlines/british-airways';
import { lufthanca } from './Airlines/lufthanca';
import { audi } from './Cars/audi';
import { bmw } from './Cars/bmw';
import { ford } from './Cars/ford';
import { mercedes } from './Cars/mercedes';
import { adidas } from './Clothing/adidas';
import { lacoste } from './Clothing/lacoste';
import { puma } from './Clothing/puma';
import { cola } from './Drinks/cola';
import { fanta } from './Drinks/fanta';
import { pepsi } from './Drinks/pepsi';
import { apple } from './Electronics/apple';
import { nokia } from './Electronics/nokia';
import { chance } from './Game/chance';
import { goToJail } from './Game/goToJail';
import { jackpot } from './Game/jackpot';
import { jail } from './Game/jail';
import { luxuryTax } from './Game/luxuryTax';
import { parking } from './Game/parking';
import { start } from './Game/start';
import { tax } from './Game/tax';
import { holidayInn } from './Hotels/holiday-inn';
import { novotel } from './Hotels/novotel';
import { radissonBlu } from './Hotels/radisson-blu';
import { boss } from './Perfumeries/boss';
import { chanel } from './Perfumeries/chanel';
import { burgerKing } from './Restaurants/burger-king';
import { kfc } from './Restaurants/kfc';
import { mcDonalds } from './Restaurants/mc-donalds';
import { rockstar } from './VideoGames/rockstar';
import { rovio } from './VideoGames/rovio';
import { amazon } from './WebServices/amazon';
import { facebook } from './WebServices/facebook';
import { viber } from './WebServices/viber';

const createMapTile = (tile: Tile, index: number): MapTile => {
    return {
        tile,
        index,
    };
};

const tiles: Tile[] = [
    start,
    chanel,
    chance,
    boss,
    tax,
    mercedes,
    adidas,
    chance,
    puma,
    lacoste,
    jail,
    parking,
    amazon,
    rockstar,
    viber,
    facebook,
    audi,
    cola,
    chance,
    pepsi,
    fanta,
    jackpot,
    americanAirlines,
    chance,
    lufthanca,
    britishAirways,
    bmw,
    mcDonalds,
    burgerKing,
    rovio,
    kfc,
    goToJail,
    holidayInn,
    radissonBlu,
    chance,
    novotel,
    ford,
    luxuryTax,
    apple,
    chance,
    nokia,
];
const mapTiles: MapTile[] = [];

for (let i = 0; i < tiles.length; i++) {
    mapTiles.push(createMapTile(tiles[i], i + 1));
}

export {
    mapTiles,
};
