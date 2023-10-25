'use client'
import React, {useState} from 'react';
import EmailIcon from "@/components/ui/icons/EmailIcon";
import {useRouter} from "next/navigation";
import {placeholder} from "@babel/types";

type Props = {
    id: string;
    type: string;
    placeholder: string;
    icon: JSX.Element;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: string;
    errorMessage?: string;
};

const FormInput: React.FC<Props> = ({id, type, autoComplete, placeholder, icon, value, onChange, errorMessage}) => {
    return (
        <>
            <div className="relative">
                <label htmlFor="email-address" className="sr-only">
                    {placeholder}
                </label>
                <input
                    className="appearance-none outline-none rounded-[10px] relative block w-full px-3 py-2 bg-gray-100 border border-gray-300 placeholder-gray-500 text-gray-900 focus:bg-gray-200 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] sm:text-sm ease-out duration-200"
                    id={id}
                    name={id}
                    type={type}
                    required
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <span className="absolute right-[10px] top-[50%] -mt-[8px] z-10">
                    {icon}
                </span>
            </div>

            {/* 오류 메시지 출력 */}
            {errorMessage && (<p className="text-red-500 text-sm">{errorMessage}</p>)}
        </>
    );
};

export default FormInput;