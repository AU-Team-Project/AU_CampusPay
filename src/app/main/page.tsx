import React from 'react';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

import Image from 'next/image';
import Navbar from "@/components/Navbar";
import TabMenu from "@/components/TabMenu";

import IndexCalendar from "@/components/ui/Icons/IndexCalendar";
import IndexCart from "@/components/ui/Icons/IndexCart";
import IndexSpeaker from "@/components/ui/Icons/IndexSpeaker";
import Footer from "@/components/Footer";

const indexData = [
    {
        id: 1,
        icon: <IndexCalendar/>,
        label: '식단표'
    },
    {
        id: 2,
        icon: <IndexCart/>,
        label: '식권구매'
    },
    {
        id: 3,
        icon: <IndexSpeaker/>,
        label: '공지사항'
    }
]

const Page = async () => {
    const session: any = await getServerSession(options);

    return (
        <div className='flex flex-col'>
            <Navbar/>
            <div>
                <Image
                    src='/img/Index_slide1.jpg'
                    width={1440}
                    height={250}
                    alt='메인 페이지 상단 로고'
                />
            </div>
            <TabMenu session={session}/>
            <div className='flex bg-mid-bg-image h-60 text-white'>
                <div className='grid grid-cols-4'>
                    {indexData.map((item) => (
                        <div key={item.id}>
                            {item.icon}
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
                <div>
                    <h1>사용에 어려움을 겪고 계신가요?</h1>
                    <p>챗봇을 통해 이용 안내와,<br/>불편사항을 해결할 수 있습니다.</p>
                    <button>
                        챗봇 추가하기
                    </button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Page;