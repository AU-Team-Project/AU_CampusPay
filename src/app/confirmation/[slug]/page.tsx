import React from 'react';
import QrCode from "@/components/ui/QrCode";
import PreviousButton from "@/components/ui/PreviousButton";

type Props = {
    params: {
        slug: string;
    }
    searchParams: {
        id: string;
        state: string;
        menu: string;
    }
}

const ConfirmationPage = async ({params, searchParams}: Props) => {
    const stateText = searchParams.state === '미사용' ? '사용가능' : '사용불가';

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
                <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
                    <QrCode props={searchParams}/>
                </div>
                <p className="text-center text-gray-700 font-medium">
                    {searchParams.menu}
                    <br/>
                    임시값: {searchParams.id}
                    <br/>
                    <span className={`font-bold ${stateText === '사용가능' ? 'text-green-500' : 'text-red-500'}`}>
                        {stateText}
                    </span>
                </p>
                <PreviousButton props={'돌아가기'}/>
            </div>
        </div>
    );
};


export default ConfirmationPage;