import React from 'react';
import {redirect, useSearchParams} from "next/navigation";
import {ObjectId} from "mongodb";
import ColorButton from "@/components/ui/ColorButton";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

type Props = {
    params: {
        slug: ObjectId;
    }
}

const NoticeEditPage = async (params: Props) => {
    const session = await getServerSession(options);
    if (session?.user.role !== 'admin') {
        redirect('/')
    }

    const res = await fetch(`${process.env.SITE_URL}/api/admin/find?post=651272f1316d83a83d5628a6`);
    const data = await res.json();
    const findData = data.data;

    return (
        <div>
            <h2>수정 페이지</h2>
            <form
                action='api/admin/edit'
                method='PUT'
            >
                <p>작성자 : {findData.username}</p>
                <input type="text" name="username" defaultValue={findData._id} className='border-2' />
                <input type="text" name="title" defaultValue={findData.title} className='border-2' />
                <textarea name="content" defaultValue={findData.content} className='border-2'/>
                <ColorButton text={'제출'}/>
            </form>
        </div>
    );
};

export default NoticeEditPage;