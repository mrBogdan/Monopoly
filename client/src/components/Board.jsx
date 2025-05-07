import React, {useEffect, useState} from 'react';

import CornerTile from './Tile/CornerTile';
import PropertyTile from './Tile/PropertyTile';
import Tile from './Tile/Tile';
import {Popup} from './Popup/Popup';
import {Player} from './Player/Player';

import '../styles/Board.css';

const Board = () => {
    const [socket, setSocket] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);

    useEffect(() => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiaWQiOiIxMjMiLCJpYXQiOjE1MTYyMzkwMjJ9.mg9J98D_GA0pWNoLyKNAW5BDYKJ_CtFOv13APAvyfDI';
        const ws = new WebSocket('ws://127.0.0.1:8080/ws?token=' + token);

        ws.addEventListener('open', () => {
            console.log('WebSocket Client Connected');
        });

        ws.addEventListener('close', () => {
            console.log('WebSocket Client Disconnected');
        })

        ws.addEventListener('message', (event) => {
            const parsedMessage = JSON.parse(event.data);
            console.log({parsedMessage});

            switch (parsedMessage.type) {
                case 'game:move':
                    console.log('Player moved:', parsedMessage);
                    break;
                default:
                    console.log('Unknown message:', event.data);
            }
        });

        setSocket(ws);

        return () => {
            ws.close();
        }
    }, []);

    const sendMessage = (message) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open. Unable to send message:', message);
        }
    }

    const move = (playerId, gameId) => {
        const message = {
            type: 'game:move',
            data: {
                playerId,
                gameId
            }
        };
        sendMessage(message);
    }

  return (
    <div className="board">
        <Player />
        <Player />
        <Player />
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
        <button onClick={() => setPopupVisible(true)}>Send</button>
        <button onClick={() => move(1, '123')}>Send</button>
        <Popup show={popupVisible} onClose={() => setPopupVisible(false)} onConfirm={() => setPopupVisible(false)}/>
    </div>
  );
};

export default Board;
