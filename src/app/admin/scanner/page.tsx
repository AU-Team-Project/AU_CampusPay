'use client'
import React, { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from '@zxing/library';
import {useSession} from "next-auth/react";
import {redirect, useRouter} from "next/navigation";

interface ApiResponse {
    success: boolean;
    message: string;
}

const QRScanner: React.FC = () => {
    const session = useSession();
    if (session?.data?.user?.role != 'admin' || !session) {
        redirect('/')
    }

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [popupMessage, setPopupMessage] = useState<string | null>(null);

    useEffect(() => {
        const codeReader = new BrowserQRCodeReader();

        // Replace undefined with null
        codeReader.decodeFromVideoDevice(null, videoRef.current, async (result, err) => {
            // Use result.getText() instead of result.text
            if (result && result.getText()) {
                const qrText = result.getText();

                try {
                    const response = await fetch('/api/scanner', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ qrData: qrText })
                    });

                    const data: ApiResponse = await response.json();
                    if (data.success) {
                        setPopupMessage('성공');
                    } else {
                        setPopupMessage('실패');
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                    setPopupMessage('실패');
                }
            }
        });

        return () => {
            codeReader.reset();
        }
    }, []);

    useEffect(() => {
        if (popupMessage) {
            setTimeout(() => {
                setPopupMessage(null);
            }, 3000);
        }
    }, [popupMessage]);

    return (
        <div className="relative">
            <video ref={videoRef} className="w-full h-screen object-cover transform scaleX(-1)" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-0"></div>

            {/* Scan Area */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-red-500 bg-transparent z-10"></div>  {/* <-- bg-transparent와 z-10 추가 */}

            {popupMessage && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md shadow-lg z-20">
                    {popupMessage}
                </div>
            )}
        </div>
    )
}

export default QRScanner;