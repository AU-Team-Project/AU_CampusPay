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

    const [form, setForm] = useState({
        data: {
            email: '',
            password: '',
            passwordConfirm: '',
            username: '',
            student_number: '',
            phone: ''
        },

        errors: {
            email: '',
            password: '',
            passwordConfirm: '',
            username: '',
            student_number: '',
            phone: ''
        }
    })

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm(prevForm => ({
            ...prevForm,
            data: {
                ...prevForm.data,
                [name]: value
            },

            error: {
                ...prevForm.errors,
                [name]: ''
            }
        }));
    };

    const inputData = [
        {
            id: 'email',
            type: 'email',
            autoComplete: 'email',
            placeholder: '이메일 주소',
            icon: <EmailIcon />,
            errorMessage: form.errors.email,
            value: form.data.email,
        },
        {
            id: 'password',
            type: 'password',
            autoComplete: 'current-password',
            placeholder: '비밀번호',
            icon: <PasswordIcon />,
            errorMessage: form.errors.password,
            value: form.data.password,
        },
        {
            id: 'passwordConfirm',
            name: 'passwordConfirm',
            type: 'password',
            autoComplete: 'new-password',
            placeholder: '비밀번호 확인',
            icon: <PasswordIcon />,
            errorMessage: form.errors.passwordConfirm,
            value: form.data.passwordConfirm,
        },
        {
            id: 'username',
            type: 'text',
            autoComplete: 'current-password',
            placeholder: '이름',
            icon: <UserIcon />,
            errorMessage: form.errors.username,
            value: form.data.username,
        },
        {
            id: 'student_number',
            type: 'text',
            autoComplete: 'current-password',
            placeholder: '학번',
            icon: <StudentIcon />,
            errorMessage: form.errors.student_number,
            value: form.data.student_number,
        },
        {
            id: 'phone',
            type: 'text',
            autoComplete: 'current-password',
            placeholder: '휴대폰 번호',
            icon: <MobileIcon />,
            errorMessage: form.errors.phone,
            value: form.data.phone,
        },
    ];

    const validateForm = () => {
        const validationErrors = { ...form.errors }
        let isFormValid = true;

        if (!form.data.email.trim()) {
            validationErrors.email = '이메일을 입력해주세요.';
        } else if (!isValidEmail(form.data.email)) {
            validationErrors.email = '유효한 이메일 주소를 입력하세요.';
        }

        if (!form.data.password.trim()) {
            validationErrors.password = '비밀번호를 입력해주세요.';
        } else if (!isValidPassword(form.data.password)) {
            validationErrors.password = '비밀번호는 8-20자 길이여야 하며, 영문, 숫자, 특수문자를 포함해야 합니다.';
        }

        if (form.data.password !== form.data.passwordConfirm) {
            validationErrors.passwordConfirm = '비밀번호가 일치하지 않습니다.';
        }

        if (!form.data.username.trim()) {
            validationErrors.username = '이름을 입력해주세요.';
        } else if (!isValidUsername(form.data.username)) {
            validationErrors.username = '올바른 이름을 입력하세요.';
        }

        if (!form.data.student_number.trim()) {
            validationErrors.student_number = '학번을 입력해주세요.';
        } else if (!isValidStudentNumber(form.data.student_number)) {
            validationErrors.student_number = '올바른 학번을 입력하세요.';
        }

        if (!form.data.phone.trim()) {
            validationErrors.phone = '휴대폰 번호를 입력해주세요.';
        } else if (!isValidPhoneNumber(form.data.phone)) {
            validationErrors.phone = '유효한 휴대폰 번호를 입력하세요.';
        }

        // 검사 결과를 상태 변수에 설정
        setForm(prevForm => ({
            ...prevForm,
            errors: validationErrors
        }))

        return isFormValid;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const result = await res.json();
        if (result.success) {
            alert('Ok');
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