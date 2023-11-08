import React from 'react';

type Props = {
    text: string;
    buttonType?: 'submit' | 'button' | 'reset';
    className?: string;
    onClick?: () => void;
}

const ColorButton = ({buttonType, text, onClick, className}: Props) => {
    return (
        <button
            type={buttonType}
            className={className}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ColorButton;