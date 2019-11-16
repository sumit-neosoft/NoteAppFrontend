import React from 'react';

const FloatingButton = ({ onClick, isActive }) => (
    <button
        className="float"
        disabled={isActive}
        style={{ backgroundColor: isActive ? "grey" : "#1e90ff" }}
        onClick={onClick}>
        <i className="fas fa-notes-medical icon fa-2x"></i>
    </button >
)

export default FloatingButton