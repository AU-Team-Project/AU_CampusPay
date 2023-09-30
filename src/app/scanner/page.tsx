import React from 'react';
import Scanner from "@/components/Scanner";

const QRCodeScanner = () => {

    return (
        <div
            id="qr-reader"
            className='w-screen h-screen border-black'
        >
            <Scanner/>
            <div id="qr-reader-results"></div>
        </div>
    )
};

export default QRCodeScanner;