'use client'
import React from 'react';
import WriteForm from "@/components/WriteForm";

const Page = () => {

    return (
        <div className="w-full">
            <div className="pt-3 flex justify-center text-center">
                <span className="text-[30px] text-gray-700 font-semibold">
                    공지 작성
                </span>
            </div>
            <div className="md:px-52 flex justify-center">
                <WriteForm/>
            </div>

        </div>

    );
};

export default Page;