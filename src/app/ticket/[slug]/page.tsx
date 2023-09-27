import React from 'react';
import TopNavbar from "@/components/Navbar";
import {Menu} from "@/model/menu";
import Link from "next/link";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import ColorButton from "@/components/ui/ColorButton";

type Props = {
    params: {
        slug: string;
    }

}

const TicketPage = async ({params}: Props) => {
    const session = await getServerSession(options);
    if (!session) {
        // 세션이 없을경우 처리
        window.location.href = '/';
    }

    // 현재 로그인한 사용자 이름 또는 아이디
    const currentUserId = session?.user._id || session?.user.username;
    
    // 현재 로그인한 사용자 기준으로 데이터 패칭
    const res = await fetch(`${process.env.SITE_URL}/api/confirmation/${currentUserId}`)
    const data = await res.json();
    const featDate = data.data;
    console.log(featDate)

    // "state"가 미사용인 아이템만 출력
    const unusedItems = featDate.slice(1).filter((item: Menu) => item.state === '미사용');

    return (
        <>
            <TopNavbar/>
            <main className='mx-5'>
                {unusedItems.length > 0 ? (
                    unusedItems.map((item: Menu) => (
                        <div key={item._id} className='max-w-2xl m-auto my-5 p-5 flex justify-between border border-gray-200 rounded-lg shadow-md bg-white'>
                            <div className="flex-grow">
                                <Link href={`/confirmation/${encodeURIComponent(item.name)}?id=${encodeURIComponent(item._id)}&menu=${encodeURIComponent(item.menu ?? '')}&state=${encodeURIComponent(item.state ?? '')}`}>
                                <div className="cursor-pointer">
                                        <p className="text-gray-700 font-medium mb-2">
                                            <span className='text-green-500 font-bold'>
                                                [{item.state ? '사용가능' : ''}]
                                            </span>
                                            &nbsp;{item.menu}
                                        </p>
                                        <p className="text-xl font-bold">
                                            {item.amount}원
                                        </p>
                                        <p className="text-xl font-bold">
                                            {item._id}원
                                        </p>
                                    </div>
                                </Link>
                            </div>
                            <div>
                                <ColorButton
                                    text='취소요청'
                                    className='mt-6 px-4 py-2 bg-red-500 text-white text-xs rounded-full font-medium tracking-wide hover:bg-red-600 transition ease-in-out duration-300'
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>사용 가능한 식권이 없습니다.</p>
                )}
            </main>
        </>
    );
};

export default TicketPage;