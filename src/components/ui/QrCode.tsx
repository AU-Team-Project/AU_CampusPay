'use client'
import React, {useEffect, useRef} from 'react';
import QRCode from "qrcode";
import {useSession} from "next-auth/react";
import {Menu} from "@/model/menu";

type QrCodeProps = {
    id: string;
    state: string;
    menu: string;
};

type Props = {
    props: QrCodeProps;
}

const QrCode = ({props}: Props) => {
    const { data: session } = useSession();
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(
                canvasRef.current,
                `${props}`,
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