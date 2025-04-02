import React from 'react';
import '../../styles/Tile.css';

const Tile = ({ id, children, className = '' }) => {
  return (
    <div className={`tile ${className}`} id={id}>
      {children}
    </div>
  );
};

export default Tile;
