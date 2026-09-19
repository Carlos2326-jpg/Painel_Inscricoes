import React from 'react';
import '../../_shared/style/components/common/button.css';

export default function Button({
    type = 'button',
    text = 'Quero participar',
    onClick,
    className = ''
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`button ${className}`}
        >
            {text}
        </button>
    );
}