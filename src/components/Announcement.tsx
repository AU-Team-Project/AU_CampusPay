import React from 'react';
import Link from "next/link";
import MoveNoticeIcon from "@/components/ui/Icons/MoveNoticeIcon";
import {ObjectId} from "mongodb";

type NoticeItem = {
    _id: ObjectId;
    user_id: ObjectId;
    username: string;
    title: string;
    content: string;
    date: string;
    time: string;
    count: number;
}

const Announcement = async () => {
    const res = await fetch(`${process.env.SITE_URL}/api/notice`);
    const data = await res.json();
    const factText = data.data;
    console.log(factText)

    return (
        <div className='mx-5 mb-5 p-5 bg-white md:col-span-3 rounded-lg shadow-lg col-span-1'>
            <div className='flex items-center justify-between px-4 pb-4'>
                <h3 className='text-xl font-bold'>공지사항</h3>
                <Link href={`/notice/lists?page=1`}>
                    <MoveNoticeIcon/>
                </Link>
            </div>

            <div className='divide-y divide-gray-300'>
                {factText.map((item: NoticeItem, index: number) => (
                    <div
                        key={index}
                        className={`flex justify-between py-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                    >
                        <div className='w-1/4 px-2'>
                            {item.count}
                        </div>
                        <div className='w-1/4 px-2'>
                            {item.title}
                        </div>
                        <div className='w-1/4 px-2 text-right'>
                            {item.username}
                        </div>
                        <div className='w-1/4 px-2 text-right'>
                            {item.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcement;