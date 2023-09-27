'use client'
import React, {useEffect, useState} from 'react';
import {Html5Qrcode} from "html5-qrcode";

const Scanner = () => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let qrCodeScanner: any;

        if (typeof window !== "undefined") {
            const { Html5Qrcode } = require("html5-qrcode");
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
                            console.log(data) // 서버 응답 처리

                            // QR 코드 스캔 성공 시 모달 표시
                            setShowModal(true);
                            setTimeout(() => {
                                setShowModal(false); // 1초 후 모달 숨기기
                            }, 1000);
                        })
                        .catch(error => {
                            console.error('Error updating state : ', error)
                        })
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
            {showModal &&
                <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white p-5 rounded-md'>
                        식권 인식됨!
                    </div>
                </div>
            }
        </>
    );
};

export default Scanner;