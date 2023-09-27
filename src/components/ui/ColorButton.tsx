import React from 'react';

type Props = {
    text: string,
    onClick?: () => void;
}

const ColorButton = ({text, onClick}: Props) => {
    return (
        <button
            className=''
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ColorButton;