'use client'
import React from 'react';
import {signIn} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import EmailIcon from "@/components/ui/icons/EmailIcon";
import PasswordIcon from "@/components/ui/icons/PasswordIcon";

const LoginPage = () => {
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const response = await signIn('Credentials', {
            email,
            password,
            redirect: false
        });

        if (response?.error) {
            // 로그인 에러 처리
            console.error(response.error);
        } else {
            // 로그인 성공시 홈페이지로 리다이렉트
            window.location.href = '/';
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 sm:bg-white">
            <div className="max-w-md w-full space-y-6 bg-white p-6 rounded-md shadow-md sm:shadow-none">
                <div className='px-10 flex justify-center'>
                    <Link className='flex items-center gap-1' href='/'>
                        <Image
                            src='/Logo_AU_CampusPay_Blue.svg'
                            width={225}
                            height={100}
                            alt='웹페이지 로고'
                        />
                    </Link>
                </div>
                <div>
                    <h2 className="mt-10 text-center text-3xl font-extrabold text-blue-custom">
                        로그인
                    </h2>
                </div>
                <form
                    className="mt-5 space-y-6"
                    onSubmit={handleSubmit}
                >
                    <div className="rounded-md shadow-sm flex flex-col gap-4">
                        <div className="relative">
                            <label htmlFor="email-address" className="sr-only">
                                이메일 주소
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none outline-none rounded-[10px] relative block w-full px-3 py-2 bg-gray-100 border border-gray-300 placeholder-gray-500 text-gray-900 focus:bg-gray-200 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] sm:text-sm ease-out duration-200"
                                placeholder="이메일 주소"
                            />
                            <span className="absolute right-[10px] top-[50%] -mt-[8px] z-10">
                                <EmailIcon/>
                            </span>
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                비밀번호
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none outline-none rounded-[10px] relative block w-full px-3 py-2 bg-gray-100 border border-gray-300 placeholder-gray-500 text-gray-900 focus:bg-gray-200 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] sm:text-sm ease-out duration-200"
                                placeholder="비밀번호"
                            />
                            <span className="absolute right-[10px] top-[50%] -mt-[8px] z-10">
                                <PasswordIcon/>
                            </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-blue-custom-hover border-transparent text-[18px] font-medium rounded-[25px] text-white bg-blue-custom-deep hover:bg-blue-custom-hover active:outline-none active:ring active:ring-offset-3 active:ring-blue-custom-hover ease-out duration-200"
                        >
                            로그인
                        </button>
                    </div>
                </form>
                <div className="flex justify-around text-[12px] text-gray-600">
                    <Link href={'/register'}>회원가입</Link>
                    <Link href={'/login'}>비밀번호 변경</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;