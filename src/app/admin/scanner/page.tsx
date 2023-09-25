'use client'
import React, { useEffect } from 'react';

const QRScanner = () => {
    useEffect(() => {
        let qrCodeScanner: any;

        if (typeof window !== "undefined") {
            const { Html5Qrcode } = require("html5-qrcode");
            qrCodeScanner = new Html5Qrcode("qr-reader");

            qrCodeScanner.start(
                { facingMode: "environment" }, // Device camera preference
                (decodedText: any) => {
                    console.log(decodedText); // QR 코드 스캔 결과
                },
                (errorMessage: any) => {
                    console.error(errorMessage); // 스캔 중 오류
                }
            );
        }

        // Cleanup
        return () => {
            if (qrCodeScanner) {
                qrCodeScanner.stop();
            }
        };
    }, []);

    return (
        <>
            <h2>큐알코드 스캐너</h2>
            <div id="qr-reader" style={{ width: '500px', height: '500px' }}></div>;
        </>
    )
};

export default QRScanner;
