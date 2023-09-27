'use client'
import React, {useEffect, useRef} from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {
    const readerRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 20,
        }, true);

        scanner.render(success, error);

        function success(result: any) {
            if (result === '식사 맛있게 하세요.') {
                window.alert('식사 맛있게 하세요.');
            }

            scanner.clear();

            if (readerRef.current) {
                readerRef.current.remove();
            }
        }

        function error(err: any) {
            console.error(err);
        }

        return () => {
            scanner.clear();
        };
    }, []);

    return (
        <main className='flex justify-center items-center'>
            <div id="reader" className='w-full h-full'></div>
        </main>
    );
}
