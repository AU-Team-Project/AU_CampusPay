'use client'
import React, {useState} from 'react';
import {useRouter} from "next/navigation";
import EmailIcon from "@/components/ui/icons/EmailIcon";
import PasswordIcon from "@/components/ui/icons/PasswordIcon";
import UserIcon from "@/components/ui/icons/UserIcon";
import StudentIcon from "@/components/ui/icons/StudentIcon";
import MobileIcon from "@/components/ui/icons/MobileIcon";

const FormComponent = () => {
    const router = useRouter()

    // input 태그 상태 저장 (기본값 :null)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        student_number: '',
        phone: ''
    });

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await res.json();
        console.log(result)
        if (result.success) {
            router.replace('/');
        } else {
            console.error('error')
        }
    }

    const handleClickRoute = (e: any) => {
        alert('ok')
        router.replace('/');
    }

    return (
        <form
            className="mt-8 space-y-6"
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
                        value={formData.email}
                        onChange={handleOnchange}
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
                        value={formData.password}
                        onChange={handleOnchange}
                    />
                    <span className="absolute right-[10px] top-[50%] -mt-[8px] z-10">
                        <PasswordIcon/>
                    </span>
                </div>
                <div className="relative">
                    <label htmlFor="password" className="sr-only">
                        이름
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="current-password"
                        required
                        className="appearance-none outline-none rounded-[10px] relative block w-full px-3 py-2 bg-gray-100 border border-gray-300 placeholder-gray-500 text-gray-900 focus:bg-gray-200 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] sm:text-sm ease-out duration-200"
                        placeholder="이름"
                        value={formData.username}
                        onChange={handleOnchange}
                    />
                    <span className="absolute right-[10px] top-[50%] -mt-[8px] z-10">
                        <UserIcon/>
                    </span>
                </div>
                <div className="relative">
                    <label htmlFor="password" className="sr-only">
                        학번
                    </label>
                    <input
                        id="student_number"
                        name="student_number"
                        type="text"
                        autoComplete="current-password"
                        required
                        className="appearance-none outline-none rounded-[10px] relative block w-full px-3 py-2 bg-gray-100 border border-gray-300 placeholder-gray-500 text-gray-900 focus:bg-gray-200 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] sm:text-sm ease-out duration-200"
                        placeholder="학번"
                        value={formData.student_number}
                        onChange={handleOnchange}
                    />
                    <span className="absolute right-[10px] top-[50%] -mt-[8px] z-10">
                        <StudentIcon/>
                    </span>
                </div>
                <div className="relative">
                    <label htmlFor="phone" className="sr-only">
                        전화번호
                    </label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="current-password"
                        required
                        className="appearance-none outline-none rounded-[10px] relative block w-full px-3 py-2 bg-gray-100 border border-gray-300 placeholder-gray-500 text-gray-900 focus:bg-gray-200 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] sm:text-sm ease-out duration-200"
                        placeholder="휴대폰 번호"
                        value={formData.phone}
                        onChange={handleOnchange}
                    />
                    <span className="absolute right-[10px] top-[50%] -mt-[8px] z-10">
                        <MobileIcon/>
                    </span>
                </div>
            </div>
            <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-blue-custom-hover border-transparent text-[18px] font-medium rounded-[25px] text-white bg-blue-custom-deep hover:bg-blue-custom-hover active:outline-none active:ring active:ring-offset-3 active:ring-blue-custom-hover ease-out duration-200"
                onClick={handleClickRoute}
            >
                회원가입
            </button>
        </form>
    );
};

export default FormComponent;