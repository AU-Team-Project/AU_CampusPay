import React, { useEffect, useState } from 'react';
import PreviousButton from "@/components/ui/PreviousButton";
interface ApiResponse {
    success: boolean;
    status: number;
    message: string;
}

type Props = {
    findData: {
        username: string;
        title: string;
        content: string;
    };
}

const EditForm = (props: Props) => {
    const { findData } = props;

    return (
        <form
            className="w-full px-10 py-5 flex flex-col justify-center gap-5"
            action='api/admin/edit'
            method='PUT'
        >
            <div className="w-fit flex rounded-[15px] px-3 py-2 bg-gray-100">
                <span className="font-semibold">작성자 :</span>
                <p className="ml-1">{findData.username}</p>
            </div>

            <div>
                <input
                    className="w-full h-[50px] p-5 appearance-none outline-none placeholder-gray-400 text-gray-900 text-[17px] focus:rounded-[15px] focus:bg-gray-100 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] duration-200 border-b-2 border-gray-300"
                    type="text"
                    name="title"
                    placeholder="공지의 제목"
                    defaultValue={findData.title}
                />
            </div>
            <div>
                <textarea
                    className="w-full md:min-h-[515px] md:max-h-[515px] min-h-[750px] max-h-[750px] p-5 appearance-none outline-none placeholder-gray-400 text-gray-900 text-[17px] focus:rounded-[15px] focus:bg-gray-100 focus:ring-blue-custom focus:border-blue-custom-deep focus:z-10 focus:scale-[1.01] ease-out duration-200 border-b-2 border-gray-300"
                    name="content"
                    placeholder="공지의 내용"
                    defaultValue={findData.content}
                />
            </div>
            <div className="flex justify-between">
                <PreviousButton props={"취소"} className={"group relative w-[200px] flex justify-center py-3 px-4 border border-blue-custom-hover border-transparent text-[18px] font-medium rounded-[25px] text-white bg-blue-custom-deep hover:bg-blue-custom-hover active:outline-none active:ring active:ring-offset-3 active:ring-blue-custom-hover ease-out duration-200"} />
                <button
                    className="group relative w-[200px] flex justify-center py-3 px-4 border border-blue-custom-hover border-transparent text-[18px] font-medium rounded-[25px] text-white bg-blue-custom-deep hover:bg-blue-custom-hover active:outline-none active:ring active:ring-offset-3 active:ring-blue-custom-hover ease-out duration-200"
                    type='button'
                >
                    수정
                </button>
            </div>
        </form>
    );
};

export default EditForm;
