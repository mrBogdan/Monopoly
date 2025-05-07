import React from 'react';
import Tile from './Tile';

const PropertyTile = ({ id, name, price }) => {
  return (
    <Tile id={id} className="property-tile">
      <div className="tile-name">{name}</div>
      <div className="tile-price">{price}</div>
    </Tile>
  );
};

export default PropertyTile;