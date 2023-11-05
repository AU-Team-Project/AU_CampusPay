import React from 'react';
import {Menu} from "@/model/menu";
import Link from "next/link";

import TopNavbar from "@/components/nav/Navbar";
import {getServerSession} from "next-auth";
import ColorButton from "@/components/ui/Button/ColorButton";

import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import {ObjectId} from "mongodb";

type Props = {
    params: {
        slug: string;
    }
    searchParams: {
        post: ObjectId;
    }
}

const TicketPage = async ({params}: Props) => {
    const session = await getServerSession(options);
    if (!session) {
        redirect('/')
    }

    // 현재 로그인한 사용자 이름 또는 아이디
    const currentUserId = session?.user._id || session?.user.username;
    
    // 현재 로그인한 사용자 기준으로 데이터 패칭
    const res = await fetch(`${process.env.SITE_URL}/api/confirmation/user?name=${currentUserId}`)
    const data = await res.json();
    const featDate = data.data.reverse();

    // "state"가 false인 아이템만 출력
    const unusedItems = featDate.filter((item: Menu) => !item.state);

    return (
        <>
            <TopNavbar/>
            <main className='mx-5 my-10'>
                <h2 className="text-2xl font-bold mb-5">내 식권 목록</h2>
                {unusedItems.length > 0 ? (
                    <>
                        {unusedItems.map((item: Menu) => (
                            <div key={item._id} className='mb-5 flex flex-col md:flex-row items-start md:items-center p-5 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white'>
                                <div className="md:flex-grow">
                                    <Link href={`/confirmation/${encodeURIComponent(item.name)}?id=${encodeURIComponent(item._id)}&menu=${encodeURIComponent(item.menu ?? '')}&state=${encodeURIComponent(item.state ?? '')}`}>
                                        <h3 className="text-lg font-medium text-blue-600 mb-2">{item.menu}</h3>
                                        <p className="text-gray-500">금액: {item.amount}원</p>
                                        <p className="text-gray-500">임시값: {item._id}</p>
                                        <p className="text-gray-500">임시값: {item.name}</p>
                                    </Link>
                                </div>
                                <div className="mt-3 md:mt-0">
                                    <ColorButton
                                        text='취소요청'
                                        className='px-4 py-2 bg-red-500 text-white text-xs rounded font-medium tracking-wide hover:bg-red-600 transition ease-in-out duration-300'
                                    />
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="py-10 px-6 border border-gray-300 rounded-lg shadow-md text-center">
                        <p className="text-gray-500">사용 가능한 식권이 없습니다.</p>
                    </div>
                )}
            </main>
        </>
    );
};

export default TicketPage;