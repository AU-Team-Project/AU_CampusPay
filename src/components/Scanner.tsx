'use client'
import React, {useEffect, useRef, useState} from 'react';
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {
    const readerRef = useRef<HTMLElement | null>(null);
    let lastErrorTimestamp = useRef<number>(Date.now());
    const [popupMessage, setPopupMessage] = useState<string | null>(null);

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
                console.log(data.state); // 서버의 응답을 출력
                console.log(data)
                console.log(result)

                if (result.modified === 1) {
                    window.alert('식사 맛있게 하세요.');
                }
                /** 큐알코드 스캔시 비디오 스트림 중단 */
                /*await scanner.clear();
               지 if (readerRef.current) {
                    readerRef.current.remove();
                }*/
            } catch (error) {
                //console.error('Error:', error);
            }
        }

        function error(err: any) {
            const now = Date.now();
            // 3초 이내에 발생한 오류 메시지는 출력하지 않음
            if (now - lastErrorTimestamp.current > 3000) {
                console.error(err);
                showAlert('스캔 실패!'); // 실패 팝업 출력
                lastErrorTimestamp.current = now;
            }
        }

        // 팝업을 출력하고 1초 후에 자동으로 닫는 함수
        function showAlert(message: string) {
            setPopupMessage(message);
            setTimeout(() => {
                setPopupMessage(null); // 1초 후 팝업 숨기기
            }, 1000);
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
