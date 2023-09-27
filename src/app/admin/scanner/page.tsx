import React from 'react';
import Scanner from "@/components/Scanner";

const QRCodeScanner = () => {


    return (
        <>
            <h2>큐알코드 스캐너</h2>
            <div
                id="qr-reader"
                className='w-[500px] h-[400px] border border-black'
            >
                <Scanner/>
            </div>
        </>
    )
};

export default QRCodeScanner;