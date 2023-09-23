'use client'
import React, {useEffect, useRef} from 'react';
import QRCode from "qrcode";
import {useSession} from "next-auth/react";
import {Menu} from "@/model/menu";

type Props = {
    qrData: Menu;
}

const QrCode = ({qrData}: Props) => {
    console.log(qrData)
    const { data: session } = useSession();
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(
                canvasRef.current,
                `${qrData}`,
                function (error) {
                if (error) console.error(error);
                //console.log(`success! : ${qrData}`);
            });
        }
    }, []);

    return (
        <canvas ref={canvasRef}></canvas>
    );
};

export default QrCode;