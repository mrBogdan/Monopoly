import React from 'react';
import Tile from './Tile';

const CornerTile = ({ id, label, subLabel }) => {
  return (
    <Tile id={id} className="corner">
      {label}
      {subLabel && <><br />{subLabel}</>}
    </Tile>
  );
};

export default CornerTile;