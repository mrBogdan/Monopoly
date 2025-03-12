import React from 'react';
import CornerTile from './CornerTile';
import PropertyTile from './PropertyTile';
import Tile from './Tile';
import '../styles/Board.css';

const Board = () => {
  return (
    <div className="board">
      {/* corner tiles */}
      <CornerTile id="jackpot" label="JACKPOT" />
      <CornerTile id="go-to-jail" label="GO TO JAIL" />
      <CornerTile id="start" label="START" subLabel="collect $200" />
      <CornerTile id="jail-visiting" label="JAIL || VISITING" />

      {/* bottom side */}
      <PropertyTile id="t1" name="American Airlines" price="$120" />
      <Tile id="t2">
        <div className="tile-name">?</div>
      </Tile>
      <PropertyTile id="t3" name="Lufthansa" price="$100" />
      <PropertyTile id="t4" name="British Airways" price="$100" />
      <Tile id="t5">
        <div className="tile-name">FORD</div>
        <div className="tile-price">$200</div>
      </Tile>
      <PropertyTile id="t6" name="McDonald's" price="Pay $200" />
      <PropertyTile id="t7" name="BURGER KING" price="$60" />
      <Tile id="t8">
        <div className="tile-name">ROVIO</div>
        <div className="tile-price">$100</div>
      </Tile>
      <PropertyTile id="t9" name="KFC" price="$60" />

      {/* left side */}
      <PropertyTile id="t10" name="Holiday Inn" price="$140" />
      <PropertyTile id="t11" name="Radisson BLU" price="$150" />
      <Tile id="t12">
        <div className="tile-name">?</div>
      </Tile>
      <PropertyTile id="t13" name="Novotel" price="$160" />
      <Tile id="t14">
        <div className="tile-name">LAND ROVER</div>
        <div className="tile-price">$200</div>
      </Tile>
      <Tile id="t15">
        <div className="tile-name">💎</div>
      </Tile>
      <PropertyTile id="t16" name="Apple" price="$200" />
      <Tile id="t17">
        <div className="tile-name">?</div>
      </Tile>
      <PropertyTile id="t18" name="Nokia" price="$200" />

      {/* top side */}
      <PropertyTile id="t19" name="Chanel" price="$220" />
      <Tile id="t20">
        <div className="tile-name">?</div>
      </Tile>
      <PropertyTile id="t21" name="Hugo Boss" price="$220" />
      <Tile id="t22">
        <div className="tile-name">💵</div>
      </Tile>
      <Tile id="t23">
        <div className="tile-name">MERSEDES BENZ</div>
        <div className="tile-price">$200</div>
      </Tile>
      <PropertyTile id="t24" name="Adidas" price="$260" />
      <Tile id="t25">
        <div className="tile-name">?</div>
      </Tile>
      <Tile id="t26">
        <div className="tile-name">Puma</div>
        <div className="tile-price">$150</div>
      </Tile>
      <PropertyTile id="t27" name="Lacoste" price="$280" />

      {/* right side */}
      <PropertyTile id="t28" name="YouTube" price="$300" />
      <Tile id="t29">
        <div className="tile-name">Rockstar Games</div>
        <div className="tile-price">$300</div>
      </Tile>
      <PropertyTile id="t30" name="Facebook" price="$300" />
      <PropertyTile id="t31" name="Twitter | X" price="$320" />
      <Tile id="t32">
        <div className="tile-name">AUDI</div>
        <div className="tile-price">$200</div>
      </Tile>
      <PropertyTile id="t33" name="CocaCola" price="$200" />
      <Tile id="t34">
        <div className="tile-name">?</div>
      </Tile>
      <PropertyTile id="t35" name="Pepsi" price="Pay $100" />
      <PropertyTile id="t36" name="Fanta" price="$400" />
    </div>
  );
};

export default Board;