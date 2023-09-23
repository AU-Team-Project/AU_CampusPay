'use client'
import React, {useState} from 'react';
import {useRouter} from "next/navigation";

const FormComponent = () => {
    const router = useRouter()
    const [formData, setFormData] = useState();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(`user input : ${e.target.value}`);
    }

    const handleClickRoute = (e: any) => {
        router.replace('/login');
    }

    return (
        <form
            className="mt-8 space-y-6"
            action="/api/register"
            method="POST"
            encType="multipart/form-data"
        >
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email-address" className="sr-only">
                        이메일 주소
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="이메일 주소"
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        비밀번호
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="비밀번호"
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        이름
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="이름"
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        학번
                    </label>
                    <input
                        id="studentnumber"
                        name="studentnumber"
                        type="text"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="학번"
                        onChange={handleInput}
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="sr-only">
                        전화번호
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="current-password"
                        required
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="휴대폰 번호"
                        onChange={handleInput}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleClickRoute}
            >
                회원가입
            </button>
        </form>
    );
};

export default FormComponent;