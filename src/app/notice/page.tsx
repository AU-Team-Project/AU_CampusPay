import React from 'react';
import Link from "next/link";
import { ObjectId } from "mongodb";
import TopNavbar from "@/components/Navbar";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

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
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {findData.map((item: noticeData) => (
                    <div key={item._id.toString()} className="border p-4 rounded-lg">
                        <h2 className="flex justify-between font-bold text-lg mb-2">
                            <Link href={`/admin/edit/find?post=${item._id}`}>
                                <span className="text-blue-600 hover:underline">{item.title}</span>
                            </Link>
                            {session?.user.role === 'admin' && (
                                <Link href={`/admin/edit/find?post=${item._id}`}>
                                    <span className="text-[15px] text-blue-500 hover:underline">Edit</span>
                                </Link>
                            )}
                        </h2>
                        <div className="flex justify-between">
                            <span className="font-light text-sm">{item.username}</span>
                            <span className="font-light text-sm">{item.date}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default NoticeManagementPage;
