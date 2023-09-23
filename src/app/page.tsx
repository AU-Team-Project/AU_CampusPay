import React from "react";
import Link from "next/link";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {getServerSession} from "next-auth";
import TabMenu from "@/components/TabMenu";
import TopNavbar from "@/components/Navbar";
import QuickMenu from "@/components/QuickMenu";
import MoveNoticeIcon from "@/components/ui/icons/MoveNoticeIcon";

export default async function Home() {
    const session: any = await getServerSession(options)
    const res = await fetch(`${process.env.SITE_URL}/api/notice`);
    const data = await res.json();
    const factText = data.data[0];
    
    return (
        <>
            <TopNavbar/>
            <main className='min-h-screen max-h-full bg-gray-200'>
                <div className='grid grid-cols-3 gap-4'>
                    {/* Todo : user 타입 정의 필요 */}
                    <TabMenu session={session}/>
                    <QuickMenu session={session}/>

                    {/** ### AnnounceManet */}
                    <div className='mx-5 mb-5 p-5 bg-white col-span-3 rounded-lg shadow-lg'>
                        <div className='flex items-center justify-between px-4 pb-4'>
                            <h3 className='text-xl font-bold'>공지사항</h3>
                            <Link href='/'><MoveNoticeIcon/></Link>
                        </div>
                        <div className='divide-y divide-gray-300'>
                            {[...Array(5)].map((_, idx) => (
                                <div key={idx} className={`flex justify-between py-3 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <div className='w-1/4 px-2'> {factText.title} </div>
                                    <div className='w-1/4 px-2'> {factText.title} </div>
                                    {/*<div className='w-1/2 px-2'> {factText.content} </div>*/}
                                    <div className='w-1/4 px-2 text-right'> {factText.date} </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}