import React from 'react';
import Scanner from "@/components/Scanner";

const QRCodeScanner = () => {

    return (
        <div
            id="qr-reader"
            className='w-screen h-screen border-black'
        >
            <Scanner/>
        </div>
    )
};

export default QRCodeScanner;