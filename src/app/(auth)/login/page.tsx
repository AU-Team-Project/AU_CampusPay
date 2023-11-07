'use client'
import React, {useState} from 'react';
import {signIn} from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import EmailIcon from "@/components/ui/Icons/EmailIcon";
import PasswordIcon from "@/components/ui/Icons/PasswordIcon";
import {isValidEmail, isValidPassword} from '@/service/auth';
import {useRouter} from "next/navigation";
import FormInput from "@/components/ui/Input/FormInput";

const LoginPage = () => {
    const router = useRouter();
    const [emailError, setEmailError] = useState(''); // 아이디 에러 메시지 상태 추가
    const [passwordError, setPasswordError] = useState(''); // 비밀번호 에러 메시지 상태 추가

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;


        // 이메일 유효성 검사
        if (!isValidEmail(email)) {
            setEmailError('유효한 이메일 주소를 입력하세요.');
            return;
        } else {
            setEmailError('');
        }

        // 비밀번호 유효성 검사
        if (!isValidPassword(password)) {
            setPasswordError('비밀번호는 8-20자 길이여야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.');
            return;
        } else {
            setPasswordError('');
        }

        // 로그인 시도
        const response = await signIn('Credentials', {
            email,
            password,
            redirect: false,
        });

        // 로그인 결과 처리
        if (response?.error) {
            setEmailError('로그인에 실패했습니다. 다시 시도해주세요.');
        } else {
            router.replace('/');
        }
    };

    return (
        <>
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
            <div className="w-screen flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-max w-full my-36 py-20 space-y-8 p-6 bg-white rounded-md shadow-md">
                    <div className="mb-16 px-10 flex flex-col justify-center">
                        <h1 className={'text-2xl'}>
                            CampusPay에 오신 것을 환영합니다.
                        </h1>
                        <p className={'mt-2 text-center'}>
                            시작하려면 로그인하세요.
                        </p>
                    </div>
                    {/* Login Form */}
                    <form
                        className="mt-5 space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="rounded-md shadow-sm flex flex-col gap-4">
                            <FormInput
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="이메일 주소"
                                icon={<EmailIcon/>}
                                errorMessage={emailError}
                            />
                            <FormInput
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="비밀번호"
                                icon={<PasswordIcon/>}
                                errorMessage={passwordError}
                            />
                        </div>
                        {/* Submit OR Register, Inquiry */}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-blue-custom-hover border-transparent text-[18px] font-medium rounded-[25px] text-white bg-footer-color hover:bg-blue-custom-hover active:outline-none active:ring active:ring-offset-3 active:ring-blue-custom-hover ease-out duration-200"
                            >로그인
                            </button>
                            <div className="mt-5 flex justify-around text-[12px] text-gray-600">
                                <Link
                                    href={'/register'}
                                    className={'text-[16px]'}
                                >
                                    회원가입
                                </Link>
                                <Link
                                    href={'/login'}
                                    className={'text-[16px]'}
                                >
                                    비밀번호 변경
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
