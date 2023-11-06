import React from 'react';
import FormComponent from "@/components/form/Form";
import Link from "next/link";
import Image from "next/image";

const RegisterPage = () => {
    /**
     * Todo : Server or Client 렌더링 설계
     * - input 입력을 상태로 저장해서 프롭스로 전달 */
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 sm:bg-white">
            <div className="max-w-md w-full space-y-6 bg-white p-6 rounded-md shadow-md sm:shadow-none">
                <div className='px-10 flex justify-center'>
                    <Link className='flex items-center gap-1' href='/'>
                        <Image
                            src='/AUCampusPay_Yellow.svg'
                            width={225}
                            height={100}
                            alt='웹페이지 로고'
                        />
                    </Link>
                </div>
                <FormComponent/>
            </div>
        </div>
    );
};

export default RegisterPage;