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
import { Tile } from '../tile/Tile';
import { MapTile } from '../tile/MapTile';
import { mercedes } from './Cars/mercedes';
import { parking } from './Game/parking';
import { cola } from './Drinks/cola';
import { pepsi } from './Drinks/pepsi';
import { fanta } from './Drinks/fanta';
import { jackpot } from './Game/jackpot';
import { americanAirlines } from './Airlines/american-airlines';
import { lufthanca } from './Airlines/lufthanca';
import { britishAirways } from './Airlines/british-airways';
import { bmw } from './Cars/bmw';
import { mcDonalds } from './Restaurants/mc-donalds';
import { burgerKing } from './Restaurants/burger-king';
import { rovio } from './VideoGames/rovio';
import { kfc } from './Restaurants/kfc';
import { goToJail } from './Game/goToJail';
import { holidayInn } from './Hotels/holiday-inn';
import { radissonBlu } from './Hotels/radisson-blu';
import { novotel } from './Hotels/novotel';
import { ford } from './Cars/ford';
import { luxuryTax } from './Game/luxuryTax';
import { apple } from './Electronics/apple';
import { nokia } from './Electronics/nokia';

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
