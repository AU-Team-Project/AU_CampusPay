'use client'
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import EmailIcon from "@/components/ui/icons/EmailIcon";
import PasswordIcon from "@/components/ui/icons/PasswordIcon";
import UserIcon from "@/components/ui/icons/UserIcon";
import StudentIcon from "@/components/ui/icons/StudentIcon";
import MobileIcon from "@/components/ui/icons/MobileIcon";
import { isValidEmail, isValidPassword, isValidUsername, isValidStudentNumber, isValidPhoneNumber } from '@/service/auth';
import FormInput from "@/components/ui/FormInput";

const FormComponent = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        student_number: '',
        phone: ''
    });

    const [errors, setErrors] = useState({
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
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    const inputData = [
        {
            id: 'email',
            name: 'email',
            type: 'email',
            autoComplete: 'email',
            placeholder: '이메일 주소',
            icon: <EmailIcon />,
            errorMessage: errors.email,
            value: formData.email,
        },
        {
            id: 'password',
            type: 'password',
            autoComplete: 'current-password',
            placeholder: '비밀번호',
            icon: <PasswordIcon />,
            errorMessage: errors.password,
            value: formData.password,
        },
        {
            id: 'password',
            type: 'password',
            autoComplete: 'current-password',
            placeholder: '비밀번호 확인',
            icon: <PasswordIcon />,
            errorMessage: errors.password,
            value: formData.password,
        },
        {
            id: 'username',
            type: 'text',
            autoComplete: 'current-password',
            placeholder: '이름',
            icon: <UserIcon />,
            errorMessage: errors.username,
            value: formData.username,
        },
        {
            id: 'student_number',
            type: 'text',
            autoComplete: 'current-password',
            placeholder: '학번',
            icon: <StudentIcon />,
            errorMessage: errors.student_number,
            value: formData.student_number,
        },
        {
            id: 'phone',
            type: 'text',
            autoComplete: 'current-password',
            placeholder: '휴대폰 번호',
            icon: <MobileIcon />,
            errorMessage: errors.phone,
            value: formData.phone,
        },
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = {
            email: '',
            password: '',
            username: '',
            student_number: '',
            phone: '',
        };

        if (!isValidEmail(formData.email)) {
            validationErrors.email = '유효한 이메일 주소를 입력하세요.';
        }

        if (!isValidPassword(formData.password)) {
            validationErrors.password = '비밀번호는 8-20자 길이여야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.';
        }

        if (!isValidUsername(formData.username)) {
            validationErrors.username = '올바른 이름을 입력하세요.';
        }

        if (!isValidStudentNumber(formData.student_number)) {
            validationErrors.student_number = '올바른 학번을 입력하세요.';
        }

        if (!isValidPhoneNumber(formData.phone)) {
            validationErrors.phone = '유효한 휴대폰 번호를 입력하세요.';
        }

        // 검사 결과를 상태 변수에 설정
        setErrors(validationErrors);

        if (Object.values(formData).some((value) => value.trim() === '')) {
            return;
        }
    
        // 에러가 하나라도 있으면 제출을 중단
        if (Object.values(validationErrors).some((error) => error !== '')) {
            return;
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await res.json();
        if (result.success) {
            alert('Ok'); // 유효성 검사 통과 시 Ok 알림 창 표시
            router.replace('/');
        } else {
            console.error('error')
        }
    }

    return (
        <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
        >
            <div className="rounded-md shadow-sm flex flex-col gap-4">
                {inputData.map((input, index) => (
                    <FormInput
                        key={index}
                        id={input.id}
                        type={input.type}
                        autoComplete={input.autoComplete}
                        placeholder={input.placeholder}
                        icon={input.icon}
                        errorMessage={input.errorMessage}
                        value={input.value}
                        onChange={handleOnchange}
                    />
                ))}
            </div>
            <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-blue-custom-hover border-transparent text-[18px] font-medium rounded-[25px] text-white bg-blue-custom-deep hover:bg-blue-custom-hover active:outline-none active:ring active:ring-offset-3 active:ring-blue-custom-hover ease-out duration-200"   
            >
                회원가입
            </button>
        </form>
    );
};

export default FormComponent;