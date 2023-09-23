import React from 'react';
import FormComponent from "@/components/form";

const RegisterPage = () => {
    /**
     * Todo : Server or Client 렌더링 설계
     * - input 입력을 상태로 저장해서 프롭스로 전달 */
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-md shadow-md">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        회원가입
                    </h2>
                </div>
                <FormComponent/>
            </div>
        </div>
    );
};

export default RegisterPage;