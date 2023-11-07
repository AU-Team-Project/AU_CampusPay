import React from 'react';
import FormComponent from "@/components/form/Form";
import Link from "next/link";
import Image from "next/image";

const RegisterPage = () => {
    /**
     * Todo : Server or Client 렌더링 설계
     * - input 입력을 상태로 저장해서 프롭스로 전달 */
    return (
        <div className={'h-[100vh]'}>
            {/* Header */}
            <div className="p-5 shadow">
                <Link className="flex items-center gap-1" href="/">
                    <Image
                        src="/AUCampusPay_Yellow.svg"
                        width={225}
                        height={100}
                        alt="웹페이지 로고"
                    />
                </Link>
            </div>
            {/* Main */}
            <div className="w-screen flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8">
                <div className="w-[620px] h-full mt-5 space-y-8 p-6 bg-white rounded-md shadow-md">
                    <FormComponent/>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;