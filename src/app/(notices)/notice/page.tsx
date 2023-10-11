import React from 'react';
import Link from "next/link";
import { ObjectId } from "mongodb";
import TopNavbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import PageNavigator from "@/components/ui/PageNavigator";

type noticeData = {
    _id: ObjectId,
    username: string;
    user_id: ObjectId;
    title: string;
    content: string;
    date: string;
    time: string;
    count: number;
}

const NoticeManagementPage = async () => {
    const session = await getServerSession(options);
    const res = await fetch(`${process.env.SITE_URL}/api/notice`);
    const data = await res.json();
    const findData = data.data;

    return (
        <>
            <TopNavbar />
            <h2 className='mt-5 text-2xl text-center font-bold'>AU Campus 공지사항</h2>
                <Link href="/write" passHref>
                    <span style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-10px' }}>
                        <span className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">공지 작성</span></span>
                </Link>


            <div className="p-8">
                {findData.map((item: noticeData) => (
                    <div key={item._id.toString()} className="border p-4 rounded-lg mb-4">
                        <h2 className="flex justify-between font-bold text-lg mb-2">
                            <Link href={`/edit/find?post=${item._id}`}>
                                <span className="text-blue-600 hover:underline">
                                    {item.title}
                                </span>
                            </Link>
                            {session?.user.role === 'admin' && (
                                <Link href={`/edit/find?post=${item._id}`}>
                                    <span className="text-[15px] text-blue-500 hover:underline">
                                        Edit
                                    </span>
                                </Link>
                            )}
                        </h2>
                        <div className="flex justify-between">
                            <span className="font-light text-sm">
                                {item.username}
                            </span>
                            <span className="font-light text-sm">
                                {item.date}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <PageNavigator/>
        </>
    );
};

export default NoticeManagementPage;