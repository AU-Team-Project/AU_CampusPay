import React from 'react';

type Props = {
    text: string;
    className?: string;
    onClick?: () => void;
}

const ColorButton = ({text, onClick, className}: Props) => {
    return (
        <button
            className={className}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ColorButton;