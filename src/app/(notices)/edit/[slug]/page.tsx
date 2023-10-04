import React from 'react';
import {redirect, useSearchParams} from "next/navigation";
import {ObjectId} from "mongodb";
import ColorButton from "@/components/ui/ColorButton";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import EditForm from "@/components/EditForm";
import {Edit} from "@sinclair/typebox/value";
import {util} from "zod";
import find = util.find;

type Props = {
    params: {
        slug : string;
    }
    searchParams: {
        post: ObjectId;
    }
}

const NoticeEditPage = async (params: Props,) => {
    const session = await getServerSession(options);
    if (session?.user.role !== 'admin') {
        redirect('/');
    }

    const res = await fetch(`${process.env.SITE_URL}/api/admin/find?post=${params.searchParams.post}`);
    const data = await res.json();
    const findData = data.data;

    return (
        <div className="w-full">
            <div className="pt-3 flex justify-center text-center">
                <span className="text-[30px] text-gray-700 font-semibold">
                    공지 수정
                </span>
            </div>
            <div className="md:px-52 flex justify-center">
                <EditForm findData={findData}/>
            </div>
        </div>
    );
};

export default NoticeEditPage;