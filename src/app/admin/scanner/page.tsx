import React from 'react';
import Scanner from "@/components/Scanner";

const QRCodeScanner = () => {


    return (
        <>
            <h2>큐알코드 스캐너</h2>
            <div className='w-[500px] h-[400px] border border-black' id="qr-reader"></div>
            <Scanner/>
        </>
    )
};

export default QRCodeScanner;