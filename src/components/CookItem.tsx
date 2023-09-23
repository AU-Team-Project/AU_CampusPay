'use client'
import React from 'react';

type CookItemProps = {
    props: string;
    onClick: () => void;
}

const CookItem = ({ props, onClick }: CookItemProps) => {
    return (
        <div
            className="w-full h-14 border-2 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition duration-150 rounded-lg shadow-md"
            onClick={onClick}
        >
            <div className="text-lg font-semibold text-gray-800">
                {props}
            </div>
        </div>
    );
};

export default CookItem;