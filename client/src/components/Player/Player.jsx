import React from 'react';
import './Player.css';

export const Player = ({ name, color = '#007bff', emoji = '🚗' }) => {
    return (
        <div className="player-icon" style={{ borderColor: color }}>
            <div className="player-emoji">{emoji}</div>
            <div className="player-name">{name}</div>
        </div>
    );
};
