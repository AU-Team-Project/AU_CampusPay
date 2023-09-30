'use client'
import { BrowserQRCodeReader } from '@zxing/library';
import { useEffect, useRef, useState } from "react";

interface ApiResponse {
    success: boolean;
    message: string;
}

const QRScanner: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [popupMessage, setPopupMessage] = useState<string | null>(null);

    useEffect(() => {
        const codeReader = new BrowserQRCodeReader();

        // Replace undefined with null
        codeReader.decodeFromVideoDevice(null, videoRef.current, async (result, err) => {
            // Use result.getText() instead of result.text
            if (result && result.getText()) {
                const qrText = result.getText();
                console.log(qrText);

                try {
                    const response = await fetch('/api/save', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ qrData: qrText })
                    });

                    const data: ApiResponse = await response.json();
                    if (data.success) {
                        console.log("Data saved successfully:", data);
                        setPopupMessage('성공');
                    } else {
                        console.error("Error saving data:", data.message);
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
    console.log(popupMessage)

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
