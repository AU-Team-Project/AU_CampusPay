'use client'
import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from "html5-qrcode";

const ScannerPage = () => {
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let qrCodeScanner: any;

        if (typeof window !== "undefined") {
            qrCodeScanner = new Html5Qrcode("qr-reader");

            qrCodeScanner.start(
                { facingMode: "environment" }, // Device camera preference
                (decodedText: any) => {
                    console.log('decodedText : ', decodedText); // QR 코드 스캔 결과

                    fetch(`${process.env.SITE_URL}/api/admin/scanner`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            _id: decodedText._id,
                            state: '사용'
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.status === "미사용") {
                                setMessage("식사 맛있게하세요!");
                            } else if (data.status === "사용") {
                                setMessage("이미 사용된 식권입니다.");
                            } else {
                                setMessage("알 수 없는 오류입니다.");
                            }

                            // QR 코드 스캔 성공 시 모달 표시
                            setShowModal(true);
                            setTimeout(() => {
                                setShowModal(false);
                            }, 1000);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                },
                (errorMessage: any) => {
                    console.error('errorMessage : ', errorMessage); // 스캔 중 오류
                },
                () => {
                    console.log('QR code scan stopped.'); // 스캔 중단 시
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
            <div id="qr-reader" style={{width: '500px', height: '500px'}}></div>
            {showModal &&
                <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-5 rounded-md'>
                        {message}
                    </div>
                </div>
            }
        </>
    );
};

export default ScannerPage;
