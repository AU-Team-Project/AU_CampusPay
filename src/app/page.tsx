import React from "react";
import Link from "next/link";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";
import TabMenu from "@/components/TabMenu";
import TopNavbar from "@/components/Navbar";
import QuickMenu from "@/components/QuickMenu";
import MoveNoticeIcon from "@/components/ui/icons/MoveNoticeIcon";
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

export default async function Home() {
    const session: any = await getServerSession(options)
    const res = await fetch(`${process.env.SITE_URL}/api/notice`);
    const data = await res.json();
    const factText = data.data;

    return (
        <>
            <TopNavbar/>
            <main className='min-h-screen max-h-full bg-gray-200'>
                <div className='grid md:grid-cols-3 gap-4 grid-cols-1'>
                    <TabMenu session={session}/>
                    <QuickMenu session={session}/>

                    {/** ### AnnounceManet */}
                    <div className='mx-5 mb-5 p-5 bg-white md:col-span-3 rounded-lg shadow-lg col-span-1'>
                        <div className='flex items-center justify-between px-4 pb-4'>
                            <h3 className='text-xl font-bold'>공지사항</h3>
                            <Link href='/notice'>
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
                </div>
            </main>
        </>
    )
}