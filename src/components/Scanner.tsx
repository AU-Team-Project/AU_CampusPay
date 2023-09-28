'use client'
import React, {useEffect, useRef} from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {
    const readerRef = useRef<HTMLElement | null>(null);
    let lastErrorTimestamp = useRef<number>(Date.now());

    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 20,
        }, true);

        scanner.render(success, error);

        async function success(result: any) {
            try {
                // 요청을 서버에 전송
                const response = await fetch(`/api/admin/scanner`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        data: result
                    })
                });

                const data = await response.json();
                console.log(data); // 서버의 응답을 출력

                if (result === '식사 맛있게 하세요.') {
                    window.alert('식사 맛있게 하세요.');
                }

                await scanner.clear();

                if (readerRef.current) {
                    readerRef.current.remove();
                }
            } catch (error) {
                //console.error('Error:', error);
            }
        }

        function error(err: any) {
            const now = Date.now();
            // 3초 이내에 발생한 오류 메시지는 출력하지 않음
            if (now - lastErrorTimestamp.current > 3000) {
                console.error(err);
                lastErrorTimestamp.current = now;
            }
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
