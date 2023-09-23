import React from 'react';
import QrCode from "@/components/ui/QrCode";

type Props = {
    params: {
        slug: string;
    }
}

const ConfirmationPage = async ({params}: Props) => {
    const res = await fetch(`http://localhost:3000/api/confirmation/${params.slug}`)
    const data = await res.json();
    const qrData = data.data[1];
    const stateText = qrData.state === '미사용' ? '사용가능' : '사용불가';
    console.log(qrData)

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
                    <QrCode qrData={qrData}/>
                </div>
                <p className="text-center text-gray-700 font-medium">
                    <span className='font-bold'>
                        {qrData.name}
                    </span>
                    <br/>
                    {qrData.menu}
                    <br/>
                    <span className='font-bold text-green-500'>
                        {stateText}
                    </span>
                </p>
                <button className="mt-6 px-8 py-2 bg-red-500 text-white rounded-full font-medium tracking-wide hover:bg-red-600 transition ease-in-out duration-300">
                    취소요청
                </button>
            </div>
        </div>
    );
};


export default ConfirmationPage;