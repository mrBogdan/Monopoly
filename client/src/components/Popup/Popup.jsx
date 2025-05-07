import React from 'react';
import './Popup.css';

export const Popup = ({ show, onClose, onConfirm }) => {
    if (!show) return null;

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Are you sure?</h2>
                <p>This action cannot be undone.</p>
                <div className="popup-buttons">
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    <button className="ok" onClick={onConfirm}>OK</button>
                </div>
            </div>
        </div>
    );
};
